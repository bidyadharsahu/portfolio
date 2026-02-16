export interface User {
  id: string;
  username: string;
  role: 'admin' | 'customer';
  full_name: string;
  phone: string;
  email: string;
  location: string;
  purpose: string;
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  description_od?: string;
  description_hi?: string;
  description_sa?: string;
  tech_stack: string[];
  live_url: string;
  github_url?: string;
  thumbnail_url: string;
  iframe_url?: string;
  category: string;
  status: 'active' | 'completed' | 'in-progress';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  user_id: string;
  project_id?: string;
  status: 'lead' | 'active' | 'completed' | 'archived';
  notes: string;
  budget?: number;
  deadline?: string;
  created_at: string;
  users?: User;
}

export interface Feedback {
  id: string;
  user_id?: string;
  name: string;
  rating: number;
  website_rating: number;
  work_rating: number;
  message: string;
  created_at: string;
}

export interface MeditationClass {
  id: string;
  title: string;
  title_od?: string;
  title_hi?: string;
  title_sa?: string;
  description: string;
  description_od?: string;
  description_hi?: string;
  description_sa?: string;
  instructor: string;
  meet_link?: string;
  scheduled_at: string;
  duration_minutes: number;
  max_participants: number;
  enrolled_count: number;
  image_url?: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  class_id: string;
  status: 'enrolled' | 'attended' | 'cancelled';
  created_at: string;
}

export interface Donation {
  id: string;
  user_id?: string;
  donor_name: string;
  amount: number;
  currency: string;
  message?: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  event_type: 'meeting' | 'class' | 'livestream' | 'deadline' | 'general';
  start_time: string;
  end_time: string;
  meet_link?: string;
  created_by: string;
  is_public: boolean;
  created_at: string;
}

export interface Livestream {
  id: string;
  title: string;
  description?: string;
  stream_url?: string;
  thumbnail_url?: string;
  status: 'scheduled' | 'live' | 'ended';
  scheduled_at?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id?: string;
  session_id: string;
  role: 'user' | 'bot';
  content: string;
  created_at: string;
}
