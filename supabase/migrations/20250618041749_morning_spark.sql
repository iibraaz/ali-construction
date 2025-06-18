/*
  # Seed data for development

  1. Sample Projects
    - Demo construction projects with different statuses

  2. Sample Tasks
    - Tasks for each project with various priorities and statuses
*/

-- Note: This is sample data for development
-- In production, users will create their own projects

INSERT INTO projects (name, description, status, user_id) VALUES
  ('Downtown Office Building', 'Modern 12-story office complex with sustainable features', 'active', 'demo-user-1'),
  ('Residential Complex Phase 1', '50-unit residential development with amenities', 'planning', 'demo-user-1'),
  ('Highway Bridge Renovation', 'Complete structural renovation of the Main St bridge', 'completed', 'demo-user-1');

-- Get project IDs for task insertion
DO $$
DECLARE
  office_project_id uuid;
  residential_project_id uuid;
  bridge_project_id uuid;
BEGIN
  SELECT id INTO office_project_id FROM projects WHERE name = 'Downtown Office Building';
  SELECT id INTO residential_project_id FROM projects WHERE name = 'Residential Complex Phase 1';
  SELECT id INTO bridge_project_id FROM projects WHERE name = 'Highway Bridge Renovation';

  INSERT INTO tasks (title, description, status, priority, project_id, due_date) VALUES
    -- Office Building Tasks
    ('Site preparation and excavation', 'Clear site and excavate foundation area', 'completed', 'high', office_project_id, now() - interval '30 days'),
    ('Foundation pouring', 'Pour concrete foundation and basement walls', 'completed', 'high', office_project_id, now() - interval '20 days'),
    ('Steel frame installation', 'Install structural steel framework', 'in_progress', 'high', office_project_id, now() + interval '10 days'),
    ('Electrical rough-in', 'Install electrical conduits and wiring', 'todo', 'medium', office_project_id, now() + interval '30 days'),
    
    -- Residential Complex Tasks
    ('Permit applications', 'Submit all required building permits', 'in_progress', 'high', residential_project_id, now() + interval '15 days'),
    ('Site survey and planning', 'Complete topographical survey and site planning', 'todo', 'medium', residential_project_id, now() + interval '25 days'),
    ('Utility connections planning', 'Plan water, sewer, and electrical connections', 'todo', 'medium', residential_project_id, now() + interval '35 days'),
    
    -- Bridge Renovation Tasks
    ('Final inspection', 'Complete final safety and quality inspection', 'completed', 'high', bridge_project_id, now() - interval '5 days'),
    ('Project documentation', 'Compile all project documentation and handover', 'completed', 'low', bridge_project_id, now() - interval '2 days');
END $$;