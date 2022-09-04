-- CREATE todo_list
create table public.todo_list (
  id character varying(50) not null
  , list_index integer
  , list_title text
  , create_timestamp timestamp(6) with time zone
  , update_timestamp timestamp(6) with time zone
  , primary key (id)
);

-- CREATE tasks
create table public.tasks (
  id character varying(50) not null
  , task_index integer
  , list_id character varying(50)
  , task_title text
  , dead_line timestamp(6) with time zone
  , is_completed boolean
  , create_timestamp timestamp(6) with time zone
  , update_timestamp timestamp(6) with time zone
  , primary key (id)
);

-- CREATE notes
create table public.notes (
  id character varying(50) not null
  , task_id character varying(50)
  , note_title text
  , content_json json
  , create_timestamp timestamp(6) with time zone
  , update_timestamp timestamp(6) with time zone
  , primary key (id)
);

ALTER TABLE todo_list RENAME TO todo_list_back;

ALTER TABLE tasks RENAME TO tasks_back;