import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'your-supabase-url') return null;
  return createClient(url, key);
}

// Admin credentials (hardcoded as per requirement)
const ADMIN_USERNAME = 'hello';
const ADMIN_PASSWORD = '123456';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    // Check if admin
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        user: {
          id: 'admin-001',
          username: 'hello',
          role: 'admin',
          full_name: 'Bidyadhar Sahu',
          email: 'bidyadhar.sahu.cse.2022@nist.edu',
          phone: '',
          location: 'Odisha, India',
          purpose: 'Admin',
          created_at: new Date().toISOString(),
        },
        message: 'Admin login successful',
      });
    }

    // Check customer from Supabase
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password_hash', password) // In production, use proper hashing
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    return NextResponse.json({ user, message: 'Login successful' });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
