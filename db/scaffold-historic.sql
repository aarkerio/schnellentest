-- Schnell Test Tables
-- Chipotle Software (c) 2015-2016   MIT License

-- rails g scaffold Group name:string description:string
CREATE TABLE groups (
  "id" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL UNIQUE,
  "description" varchar(150) NOT NULL
);

-- Users
-- rails g scaffold User fname:string lname:string uname:string passwd:string active:boolean group:references
CREATE TABLE users (
    "id" serial PRIMARY KEY,
    "uname" varchar(50) NOT NULL UNIQUE, --login
    "passwd"  varchar(36)  NOT NULL,
    "fname"  varchar(70)  NOT NULL,           --real name
    "lname"  varchar(70)  NOT NULL,           --real name
    -- "email"  varchar(45)  NOT NULL UNIQUE,    -- this column is currently dropped in order to use devise
    "group_id" integer NOT NULL,                                                     -- Admin, normal user
    "created" timestamp(0) with time zone DEFAULT now() NOT NULL
);





CREATE TABLE comments (  --discutions on news
 	"id" serial PRIMARY KEY,
 	"notice_id" int NOT NULL REFERENCES notices(id) ON DELETE CASCADE,
 	"name" varchar(100),
 	"comment" text NOT NULL,
 	"created" timestamp(0) with time zone DEFAULT now() NOT NULL,
 	"level" int NOT NULL,
 	"comentnew_id" int NOT NULL,
 	"user_id" int NOT NULL,
 	"status" int NOT NULL DEFAULT 1,
 	"spam" int NOT NULL DEFAULT 0
);

-- Images if portal users
-- rails g scaffold Image file:string user:references
CREATE TABLE images (
   id serial PRIMARY KEY,
   file varchar(40) NOT NULL UNIQUE,
   user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- rails g scaffold Kind name:string image:references

-- Pets
-- rails g scaffold Pet name:string age:int image:references kind:references interned:boolean created:timestamp tags:string user:references


-- User profiles
-- rails g scaffold Profile cv:text avatar:string quote:string name_blog:string livechat:boolean wiwd:boolean tags:string fck:boolean  user:references
CREATE TABLE profiles (
    id serial PRIMARY KEY,
    website  varchar(500),
    cv text,
    lang varchar(3) DEFAULT 'es',   -- english by default
    avatar  varchar(100) DEFAULT 'default-avatar.jpg' NOT NULL,
    "quote"  varchar(150),
    name_blog  varchar(150),
    license_id smallint REFERENCES licenses(id) ON DELETE CASCADE NOT NULL DEFAULT 6,  -- kind of license selecte dby the user
    livechat smallint NOT NULL DEFAULT 1,  -- active ajax chat on blog
    wiwd smallint NOT NULL DEFAULT 1,   -- what I was doing
    active smallint NOT NULL DEFAULT 0,  -- active =1, desactived = 0
    tags text NOT NULL DEFAULT 'arts, music, hacking, environment, education, pets',
    fck boolean NOT NULL DEFAULT True
);


-- rails g scaffold Activity title:string activity:text notes:text points:integer minutes:integer order:integer status:boolean user:references course:references 
CREATE TABLE activities (
    "id" serial PRIMARY KEY,
    "title" varchar(40) NOT NULL,
    "activity" text NOT NULL,
    "order" smallint DEFAULT 1 NOT NULL,
    "status" smallint DEFAULT 0 NOT NULL,
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "ecourse_id" int NOT NULL REFERENCES ecourses(id) ON DELETE CASCADE,
    "notes" text,
    "points" smallint DEFAULT 0 NOT NULL,
    "minutes" smallint DEFAULT 0 NOT NULL
);

