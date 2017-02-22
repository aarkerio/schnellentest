-- Multi-Table Full Text Search setup

-- Spanish
-- Three steps to create Text Full Search
-- This create a dictionary to create several kind of tokens : emails, number, lexems
-- lexems are created according language
CREATE TEXT SEARCH DICTIONARY schnellen_en (
    template = snowball,
    language = english
);

-- A text search configuration specifies a text search parser that can divide a string into tokens, 
-- plus dictionaries that can be used to determine which tokens are of interest for searching.
-- See: http://developer.postgresql.org/pgdocs/postgres/textsearch-configuration.html
CREATE TEXT SEARCH CONFIGURATION public.schnellen_en ( COPY = pg_catalog.english ); 

-- FTS (Full Text Search) index = Storing preprocessed documents optimized for searching
--Also allow create ranked searchs
-- A data type "tsvector" is provided for storing preprocessed documents
-- For text search purposes, each document (text field) must be reduced to the preprocessed tsvector format.

CREATE TRIGGER ts_searchtext AFTER INSERT OR UPDATE ON questions FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('searchtext', 'schnellen_en', 'question', 'explanation', 'hint', 'tags');

SELECT id, question FROM questions where searchtext @@ to_tsquery('amend');

INSERT INTO questions (user_id, question,
explanation,
hint,
tags,
worth,
origin,
created_at,
updated_at,
active,
qtype,
lang,
status)
VALUES (1,'lorem ipsum doloret amend',
'lorem ipsum doloret amend', 
'lorem ipsum doloret amend',
'lorem ipsum doloret amend',
1,
0,
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
true,
true, 
'en',
1
);

