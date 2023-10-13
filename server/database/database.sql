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
  calendar_id INTEGER UNIQUE
);

CREATE TABLE calendar_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  description TEXT,
  organization_id INTEGER
);

CREATE TABLE calendars (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE,
  subscribed_cals INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  calendar_events_arr INTEGER[] DEFAULT ARRAY[]::INTEGER[]
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  reported_username VARCHAR(255) NOT NULL,
  reporter_username VARCHAR(255) NOT NULL,
  reason TEXT NOT NULL
);

ALTER TABLE users
ADD FOREIGN KEY (calendar_id) REFERENCES calendars (id);

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