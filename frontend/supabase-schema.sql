-- Supabase Schema for Bhanpura CSC
-- Run this in Supabase SQL Editor

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

-- Enquiry form submissions table
CREATE TABLE IF NOT EXISTS enquiry_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  service_category TEXT NOT NULL,
  message TEXT NOT NULL,
  privacy_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'contacted', 'completed', 'archived'))
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_submissions ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anonymous inserts (for public forms)
CREATE POLICY "Allow anonymous inserts on contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on enquiry_submissions"
  ON enquiry_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policies: Allow authenticated users to read all (for admin dashboard later)
CREATE POLICY "Allow authenticated read on contact_submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on enquiry_submissions"
  ON enquiry_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiry_submissions_created_at ON enquiry_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_enquiry_submissions_status ON enquiry_submissions(status);