delete from notes
where id = $/note_id/
returning *
;