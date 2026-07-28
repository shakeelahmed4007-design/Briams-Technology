/**
 * supabase.js
 * -----------
 * Singleton Supabase client for Briams Technologies.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase'      (if @ alias configured)
 *   import { supabase } from '../lib/supabase'
 *
 * Set the following in your .env file (never commit real values):
 *   VITE_SUPABASE_URL   = https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY = eyJ...
 */

import { createClient } from '@supabase/supabase-js';

// ── Env variables (Vite exposes VITE_ prefixed vars to the browser) ──────────
const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── Guard: warn loudly in dev if vars are missing ────────────────────────────
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Missing environment variables.\n' +
    'Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// ── Client options ────────────────────────────────────────────────────────────
const options = {
  auth: {
    // Persist the session in localStorage so users stay logged in on refresh
    persistSession: true,
    // Auto refresh the JWT token before it expires
    autoRefreshToken: true,
    // Detect auth changes from other tabs / windows
    detectSessionInUrl: true,
  },
  // Optional: enable realtime globally (set to false if not needed)
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
};

// ── Singleton client ──────────────────────────────────────────────────────────
let supabase;
// Export a helper flag so UI can know whether Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, options);
} else {
  // Provide a minimal stub to avoid runtime crashes when env vars are missing (e.g., on Vercel before secrets set)
  const noop = async () => ({ data: null, error: { message: 'Supabase not configured' } });
  const stubFrom = () => ({ insert: noop, update: noop, select: noop, delete: noop });
  const stubStorage = () => ({ upload: noop, getPublicUrl: () => ({ data: { publicUrl: '' } }) });
  supabase = {
    from: stubFrom,
    auth: {
      signInWithPassword: noop,
      signUp: noop,
      signOut: noop,
      getUser: noop,
      getSession: noop,
    },
    storage: { from: stubStorage },
    // allow existing helper code to call supabase.* without throwing
  };
}

export { supabase };

// ── Named helpers (convenience wrappers) ─────────────────────────────────────

/**
 * Get the currently logged-in user (or null).
 * @returns {Promise<import('@supabase/supabase-js').User | null>}
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('[Supabase] getUser error:', error.message);
    return null;
  }
  return user;
}

/**
 * Get the current active session (or null).
 * @returns {Promise<import('@supabase/supabase-js').Session | null>}
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('[Supabase] getSession error:', error.message);
    return null;
  }
  return session;
}

/**
 * Sign in with email + password.
 * @param {string} email
 * @param {string} password
 */
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign up with email + password.
 * @param {string} email
 * @param {string} password
 * @param {object} [metadata]  — extra user metadata (e.g. { full_name: 'John' })
 */
export async function signUpWithEmail(email, password, metadata = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
  if (error) throw error;
  return data;
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Upload a file to a Supabase Storage bucket.
 * @param {string} bucket   - Storage bucket name
 * @param {string} path     - Destination path inside the bucket (e.g. 'avatars/user-123.png')
 * @param {File}   file     - The File object to upload
 * @returns {Promise<string>} - Public URL of the uploaded file
 */
export async function uploadFile(bucket, path, file) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Update an existing booking by id.
 * @param {string} id - Booking row id
 * @param {object} updates - Fields to update on the booking row
 */
export async function updateBooking(id, updates) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

export async function createBooking(booking) {
  const { data, error } = await supabase.from('bookings').insert([booking]).select();
  return { data, error };
}

export async function createMessage(message) {
  const { data, error } = await supabase.from('messages').insert([message]).select();
  return { data, error };
}

export async function createWaitlistEntry(entry) {
  const { data, error } = await supabase.from('waitlist').insert([entry]).select();
  return { data, error };
}
