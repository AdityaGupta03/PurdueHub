CREATE DATABASE PurdueHub;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    birthday DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_picture VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    blocked INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    friends INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    saved_courses INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    saved_orgs INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    calendar_id INTEGER UNIQUE,
    FOREIGN KEY (calendar_id) REFERENCES calendar (id)
);

CREATE TABLE calendars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE,
    subscribed_cals INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    calendar_events INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

 