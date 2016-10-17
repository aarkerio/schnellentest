-- Schnell Test Tables
-- Chipotle Software (c) 2015-2016   MIT License

-- Group Model
-- bin/rails g scaffold Group name:string description:string

-- User Model
-- bin/rails g scaffold User fname:string lname:string uname:string passwd:string active:boolean group:references

-- Test Model
-- bin/rails g scaffold Test user:references title:string description:text active:boolean shared:boolean

-- Question Model
-- bin/rails g scaffold Question user:references question:text hint:text explanation:text worth:integer active:boolean type:boolean

COMMENT ON TABLE questions IS 'Questions in tests, hasMany Answer';
COMMENT ON COLUMN questions.hint IS 'Optional hint to student';
COMMENT ON COLUMN questions.type IS 'true=multiple options, false=open answer';
COMMENT ON COLUMN questions.order IS 'Order in test';

-- TestQuestion Model
-- bin/rails g model TestQuestion test:references question:references order:integer

-- Answer Model
-- bin/rails g model Answer user:references answer:text correct:boolean question:references

-- Archive Model
-- bin/rails g model Annal user:references notes:string sumcheck:string file:string

--  Model
-- bin/rails g model Import user:references notes:string file:string tags: string



----- ######## FUTURE #########################
--  Model
-- bin/rails g model Result user:references classroom:references test:references question:references answer:references answertxt:text correct:boolean


--  Tests student results
CREATE TABLE results (
  "id" serial NOT NULL UNIQUE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,    -- student id
  "question_id" int NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  "answer_id" int,
  "answer" text,
  "correct" smallint NOT NULL DEFAULT 0,
  "test_id" int NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
  "checked" smallint NOT NULL DEFAULT 0,
   PRIMARY KEY (user_id, test_id, vclassroom_id, question_id));

COMMENT ON TABLE results IS 'Student answers to quizz tests HABTM relationship';
COMMENT ON COLUMN results.answer_id IS 'Answer to multiple option, is not used in open questions';
COMMENT ON COLUMN results.answer IS 'Answer to open questions';
COMMENT ON COLUMN results.correct IS 'Answer to open questions: correct or wrong';

--  Tests student results
CREATE TABLE "tests_students" ( 
  "id" serial NOT NULL UNIQUE,
  "user_id" int NOT NULL,   
  "test_id" int NOT NULL,
  "vclassroom_id" int NOT NULL,
  "checked" smallint NOT NULL DEFAULT 0,
  "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
   PRIMARY KEY (user_id, test_id, vclassroom_id)
);

COMMENT ON TABLE tests_students IS 'Test answered by student,graded and sent by teacher';
COMMENT ON COLUMN tests_students.checked IS 'If 1 teacher has sent tests result to students email manually';

-- Linking Kandie
CREATE TABLE "tests_vclassrooms" (
 "id" serial PRIMARY KEY,
 "test_id" int NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
 "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
 "sdate"  timestamp(0) with time zone DEFAULT now() NOT NULL,
 "fdate"  timestamp(0) with time zone DEFAULT now() NOT NULL,
 "hidden" boolean NOT NULL DEFAULT True,
  UNIQUE  ("test_id", "vclassroom_id")
);

CREATE TABLE vclassrooms (
    "id" serial PRIMARY KEY,
    "name" varchar(150) NOT NULL,
    "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
    "status" smallint DEFAULT 0 NOT NULL,
    "historical" smallint DEFAULT 0 NOT NULL,
    "ecourse_id" int NOT NULL REFERENCES ecourses(id) ON DELETE CASCADE,
    "secret" varchar(10),
    "sdate" date NOT NULL DEFAULT now(), --starting date
    "fdate" date NOT NULL DEFAULT now(), -- finish date
    "access" smallint NOT NULL DEFAULT 0,
    "message" boolean NOT NULL DEFAULT True,
    "chat" smallint NOT NULL DEFAULT 0, -- active / desactive chat
    "videoconference" smallint NOT NULL DEFAULT 0, -- active / desactive FLV stream
    "streaming" text,
    "evaluation" smallint NOT NULL DEFAULT 0, -- active / desactive student evaluation when course finish
    "diploma" smallint NOT NULL DEFAULT 0, -- active / desactive diploma when student get enough points
    "gcalendar_id" varchar(70) 
);

COMMENT ON TABLE vclassrooms IS 'Virtual classrooms';
COMMENT ON COLUMN vclassrooms.status IS 'Define published or draft';
COMMENT ON COLUMN vclassrooms.historical IS 'Vclassroom is now historical record';
COMMENT ON COLUMN vclassrooms.secret IS 'Secret code to allow students register by themselves';
COMMENT ON COLUMN vclassrooms.access IS 'Public VC in other words without secret code';
COMMENT ON COLUMN vclassrooms.message IS 'Just enabled disabled little message in vclassroom if teacher is logged, See show method';

-- Students comments about course when vclassroom finish
CREATE TABLE evaluations (
 "id" serial PRIMARY KEY,
 "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
 "evaluation" smallint,
 "intructors" text,
 "materiales" text,
 "take_another" boolean,
 "free" text, 
 "created" timestamp(0) with time zone DEFAULT now() NOT NULL
);

COMMENT ON TABLE evaluations IS 'Students comments about course when vclassroom finish';
COMMENT ON COLUMN evaluations.free IS 'suggestions, opinion or something missing';
COMMENT ON COLUMN evaluations.evaluation IS '1 to 10';

--HABTM (Core Karamelo Model)
CREATE TABLE user_vclassrooms (
  "id" serial PRIMARY KEY,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
  "group_id" smallint NOT NULL REFERENCES groups(id) ON DELETE CASCADE DEFAULT 3,
  "kind" smallint NOT NULL DEFAULT 0,
   UNIQUE ("user_id", "vclassroom_id", "kind")
);



