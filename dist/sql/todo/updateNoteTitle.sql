update 
       notes
set
       note_title = $/note_title/,
       update_timestamp = current_timestamp
where 
       id = $/note_id/
RETURNING note_title;