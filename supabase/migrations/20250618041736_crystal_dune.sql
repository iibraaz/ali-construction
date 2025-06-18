/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `status` (enum: planning, active, completed, on_hold)
      - `user_id` (text, required - Clerk user ID)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for users to manage their own projects
*/

CREATE TYPE project_status AS ENUM ('planning', 'active', 'completed', 'on_hold');

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status project_status DEFAULT 'planning',
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'sub' = user_id);

CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);