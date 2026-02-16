-- ====================================================================
-- Supabase SQL Schema for Portfolio Platform
-- Run this in the Supabase SQL Editor to set up all tables
-- ====================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- USERS
-- ====================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  full_name TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  purpose TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for auth lookups
CREATE INDEX idx_users_username ON users(username);

-- ====================================================================
-- PROJECTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  description_od TEXT,
  description_hi TEXT,
  description_sa TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT NOT NULL DEFAULT '',
  github_url TEXT,
  thumbnail_url TEXT NOT NULL DEFAULT '',
  iframe_url TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'in-progress')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = TRUE;

-- ====================================================================
-- CUSTOMERS (CRM)
-- ====================================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'active', 'completed', 'archived')),
  notes TEXT NOT NULL DEFAULT '',
  budget NUMERIC(12,2),
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_customers_status ON customers(status);

-- ====================================================================
-- FEEDBACK
-- ====================================================================
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL DEFAULT 'Anonymous',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  website_rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (website_rating >= 0 AND website_rating <= 5),
  work_rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (work_rating >= 0 AND work_rating <= 5),
  message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_feedback_created ON feedback(created_at DESC);

-- ====================================================================
-- MEDITATION CLASSES
-- ====================================================================
CREATE TABLE IF NOT EXISTS meditation_classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_od TEXT,
  title_hi TEXT,
  title_sa TEXT,
  description TEXT NOT NULL DEFAULT '',
  description_od TEXT,
  description_hi TEXT,
  description_sa TEXT,
  instructor TEXT NOT NULL DEFAULT 'Bidyadhar',
  meet_link TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  max_participants INT NOT NULL DEFAULT 50,
  enrolled_count INT NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meditation_scheduled ON meditation_classes(scheduled_at);

-- ====================================================================
-- ENROLLMENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES meditation_classes(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'attended', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, class_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);

-- ====================================================================
-- DONATIONS
-- ====================================================================
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL DEFAULT 'Anonymous',
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_donations_created ON donations(created_at DESC);

-- ====================================================================
-- CALENDAR EVENTS
-- ====================================================================
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'general' CHECK (event_type IN ('meeting', 'class', 'livestream', 'deadline', 'general')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  meet_link TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_start ON calendar_events(start_time);
CREATE INDEX idx_events_type ON calendar_events(event_type);
CREATE INDEX idx_events_public ON calendar_events(is_public) WHERE is_public = TRUE;

-- ====================================================================
-- LIVESTREAMS
-- ====================================================================
CREATE TABLE IF NOT EXISTS livestreams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  stream_url TEXT,
  thumbnail_url TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended')),
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_livestreams_status ON livestreams(status);
CREATE INDEX idx_livestreams_scheduled ON livestreams(scheduled_at);

-- ====================================================================
-- CHAT MESSAGES
-- ====================================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'bot')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_session ON chat_messages(session_id);
CREATE INDEX idx_chat_created ON chat_messages(created_at);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditation_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies (for anonymous access via anon key)
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read feedback" ON feedback FOR SELECT USING (true);
CREATE POLICY "Public read meditation_classes" ON meditation_classes FOR SELECT USING (true);
CREATE POLICY "Public read calendar_events" ON calendar_events FOR SELECT USING (is_public = true);
CREATE POLICY "Public read livestreams" ON livestreams FOR SELECT USING (true);

-- Insert policies (allow inserts from API)
CREATE POLICY "Allow user registration" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow feedback submission" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow enrollment" ON enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow chat messages" ON chat_messages FOR INSERT WITH CHECK (true);

-- Auth read policies
CREATE POLICY "Users read own data" ON users FOR SELECT USING (true);
CREATE POLICY "Users read own enrollments" ON enrollments FOR SELECT USING (true);
CREATE POLICY "Users read donations" ON donations FOR SELECT USING (true);
CREATE POLICY "Users read customers" ON customers FOR SELECT USING (true);
CREATE POLICY "Users read chat" ON chat_messages FOR SELECT USING (true);

-- Update policies
CREATE POLICY "Users update own profile" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow enrollment updates" ON enrollments FOR UPDATE USING (true);

-- Admin full-access policies (handled at application level since we use anon key)
-- For production, implement proper Supabase Auth with JWT and replace these policies

-- ====================================================================
-- FUNCTIONS: Auto-update enrolled_count
-- ====================================================================
CREATE OR REPLACE FUNCTION update_enrolled_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE meditation_classes
    SET enrolled_count = enrolled_count + 1
    WHERE id = NEW.class_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE meditation_classes
    SET enrolled_count = enrolled_count - 1
    WHERE id = OLD.class_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_enrollment_count
AFTER INSERT OR DELETE ON enrollments
FOR EACH ROW EXECUTE FUNCTION update_enrolled_count();

-- ====================================================================
-- FUNCTIONS: Auto-update updated_at on projects
-- ====================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ====================================================================
-- SEED DATA: Admin user
-- ====================================================================
INSERT INTO users (username, password, role, full_name, email)
VALUES ('hello', '123456', 'admin', 'Bidyadhar', 'admin@bidyadhar.dev')
ON CONFLICT (username) DO NOTHING;
