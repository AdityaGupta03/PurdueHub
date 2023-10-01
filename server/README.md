# PurdueHub Backend Services

## Setup the local database

NOTE: The rest of the automation and more details involving testing will come in the future.

Download postgres however necessary.
Sign in in cli using:
```psql postgres```

Sign in can also be done through GUI.

Create database called "purduehub":
```
\d purduehub
\c purduehub
```

For now, copy the sql code in database.sql which setups the schema of our DB into postgres to create a local database.