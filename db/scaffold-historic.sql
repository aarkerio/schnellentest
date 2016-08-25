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

CREATE TABLE "questions" (
  "id" serial PRIMARY KEY,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "question" text NOT NULL,
  "hint" varchar(150) NOT NULL,
  "explanation" text NOT NULL,
  "active" smallint NOT NULL DEFAULT 0,
  "worth" smallint NOT NULL DEFAULT 1,
  "type" BOOLEAN DEFAULT TRUE
);

COMMENT ON TABLE questions IS 'Questions in tests, hasMany Answer';
COMMENT ON COLUMN questions.hint IS 'Optional hint to student';
COMMENT ON COLUMN questions.type IS 'true=multiple options, false=open answer';
COMMENT ON COLUMN questions.order IS 'Order in test';

-- TestQuestion Model
-- bin/rails g model TestQuestion test:references question:references order:integer

CREATE TABLE "test_questions" (
  "id" serial PRIMARY KEY,
  "test_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "question_id" text NOT NULL,
  "order" smallint NOT NULL DEFAULT 1
);

-- Answer Model
-- bin/rails g model Answer user:references answer:text correct:boolean question:references 

CREATE TABLE "answers" (
  "id" serial PRIMARY KEY,
  "answer" varchar(150) NOT NULL,
  "correct" smallint NOT NULL,
  "question_id" int NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

COMMENT ON TABLE answers IS 'Answers to Question Model, Test module';
COMMENT ON COLUMN answers.correct IS 'wrong = 0, correct = 1';

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
  "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
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


