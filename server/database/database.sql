CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  birthday DATE,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile_picture VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  blocked INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  friends INTEGER[] DEFAULT ARRAY[]::INTEGER[],
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
  calendar_events_arr INTEGER[] DEFAULT ARRAY[]::INTEGER[],
);

ALTER TABLE users
ADD FOREIGN KEY (calendar_id) REFERENCES calendars (id);

ALTER TABLE calendars
ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TABLE email_verification (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  authCode VARCHAR(255) NOT NULL,
  FOREIGN KEY (email) REFERENCES users (email)
);
