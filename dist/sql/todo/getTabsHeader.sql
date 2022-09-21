select
       tasks.id as task_id,
       'note' as type,
       notes.id as tab_id,
       notes.note_title as tab_title
from
       tasks
left join notes on
       notes.task_id = tasks.id
order by
       notes.create_timestamp