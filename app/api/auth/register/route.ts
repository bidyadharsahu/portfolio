import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'your-supabase-url') return null;
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, full_name, phone, email, location, purpose } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    // Check if username already taken
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured. Please set up your Supabase environment variables.' }, { status: 503 });
    }
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        username,
        password_hash: password, // In production, hash this
        role: 'customer',
        full_name: full_name || '',
        phone: phone || '',
        email: email || '',
        location: location || '',
        purpose: purpose || '',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
    }

    return NextResponse.json({ user, message: 'Account created successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
