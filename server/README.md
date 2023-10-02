# PurdueHub Backend Services

## Setup

NOTE: The rest of the automation and more details involving testing will come in the future.

### Automated Setup

Requirements:
- Postgresql Version 15.4
    - Cli tool "psql" installed
    - Have a SuperUser called "postgres" with password "postgres"
- Bash scripting

The following assumes you are in the `./server` directory from the project root.

To setup postgres databases, run the bash script:
```
./bin/psql-setup.bash
```

To setup required javascript packages, run:
```
npm install
```

### Manual Setup

Download postgres however necessary.
Sign in in cli using:
```psql postgres```

Sign in can also be done through GUI.

Create database called "purduehub":
```
\d purduehub
\c purduehub
```

Copy the sql code in database.sql which setups the schema of our DB into postgres to create a local database.

To setup the required javascript packages, from the server directory from project root, run:
```
npm install
```