/*
  # Create tasks table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `status` (enum: todo, in_progress, completed)
      - `priority` (enum: low, medium, high)
      - `project_id` (uuid, foreign key to projects)
      - `assigned_to` (text, optional - user ID)
      - `due_date` (timestamp, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `tasks` table
    - Add policy for users to manage tasks in their projects
*/

CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status task_status DEFAULT 'todo',
  priority task_priority DEFAULT 'medium',
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to text,
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage tasks in their projects"
  ON tasks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.project_id 
      AND projects.user_id = auth.jwt() ->> 'sub'
    )
  );

CREATE INDEX IF NOT EXISTS tasks_project_id_idx ON tasks(project_id);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks(status);
CREATE INDEX IF NOT EXISTS tasks_due_date_idx ON tasks(due_date);