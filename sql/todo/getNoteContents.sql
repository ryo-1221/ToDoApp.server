SELECT  notes.id
       ,notes.task_id
       ,notes.note_title
       ,notes.content_json
FROM notes
WHERE
       notes.id = $/note_id/