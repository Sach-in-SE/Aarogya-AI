/*
  # Create vaccine records table

  1. New Tables
    - `vaccine_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `vaccine_name` (text, required)
      - `date_administered` (date, required)
      - `next_due_date` (date, optional)
      - `status` (text, with check constraint)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `vaccine_records` table
    - Add policies for authenticated users to manage their own vaccine records
*/

CREATE TABLE IF NOT EXISTS public.vaccine_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vaccine_name TEXT NOT NULL,
  date_administered DATE NOT NULL,
  next_due_date DATE,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'upcoming', 'overdue')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.vaccine_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own vaccine records" ON public.vaccine_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vaccine records" ON public.vaccine_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vaccine records" ON public.vaccine_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vaccine records" ON public.vaccine_records
  FOR DELETE USING (auth.uid() = user_id);