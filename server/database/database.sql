CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  birthday DATE,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile_picture VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  banned INTEGER DEFAULT 0,
  banEmail INTEGER DEFAULT 0,
  markDeleted INTEGER DEFAULT 0,
  deleteEmail INTEGER DEFAULT 0,
  blocked INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  follow INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  saved_courses INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  saved_orgs INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  calendar_id INTEGER UNIQUE,
  togglemsgs INTEGER DEFAULT 0,  /* 0 is everyone, 1 is only following people */
  professional_development INTEGER DEFAULT 0, /* For the following 3, 0 is no 1 is yes */
  club_callouts INTEGER DEFAULT 0,
  disable_all INTEGER DEFAULT 0,
  interested_events INTEGER[] DEFAULT ARRAY[]::INTEGER[],
);

CREATE TABLE calendar_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  location VARCHAR(255),
  description TEXT,
  organization_id INTEGER,
  professional_development INTEGER DEFAULT 0, /* 0 is no, 1 is yes on flag */
  club_callouts INTEGER DEFAULT 0 /* 0 is no, 1 is yes on flag */
);

CREATE TABLE calendars (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE,
  subscribed_cals INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  calendar_events_arr INTEGER[] DEFAULT ARRAY[]::INTEGER[]
);

ALTER TABLE users
ADD FOREIGN KEY (calendar_id) REFERENCES calendars (id);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  reported_username VARCHAR(255) NOT NULL,
  reporter_username VARCHAR(255) NOT NULL,
  reason TEXT NOT NULL
);

CREATE TABLE organization (
  org_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  officers INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  followers INTEGER[] DEFAULT ARRAY[]::INTEGER[]
);

CREATE TABLE email_verification (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  authCode VARCHAR(255) NOT NULL,
  FOREIGN KEY (email) REFERENCES users (email)
);

CREATE TABLE username_reset_verification (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  authCode VARCHAR(255) NOT NULL,
  FOREIGN KEY (email) REFERENCES users (email)
);

CREATE TABLE password_reset_verification (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  authCode VARCHAR(255) NOT NULL,
  FOREIGN KEY (email) REFERENCES users (email)
);

CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  feedback_title TEXT,
  feedback_body TEXT
);