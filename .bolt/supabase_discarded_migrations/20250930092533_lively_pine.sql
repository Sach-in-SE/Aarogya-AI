/*
  # Create profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `phone` (text)
      - `blood_group` (text)
      - `is_diabetic` (boolean)
      - `address` (text)
      - `gender` (text)
      - `age` (integer)
      - `emergency_contact` (text)
      - `allergies` (text array)
      - `chronic_conditions` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  blood_group TEXT,
  is_diabetic BOOLEAN,
  address TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  age INTEGER,
  emergency_contact TEXT,
  allergies TEXT[],
  chronic_conditions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);