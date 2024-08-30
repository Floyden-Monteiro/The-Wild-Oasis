import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://uetsfabnpkicudxbqczh.supabase.co';
export const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVldHNmYWJucGtpY3VkeGJxY3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NDYwNDYsImV4cCI6MjA0MDQyMjA0Nn0.b1ZE0PazIG15nxES5RICz2j0jrz9rPPZ7B8a2M2JvRQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
