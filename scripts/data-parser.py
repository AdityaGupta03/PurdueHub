import csv
import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    database="purduehub",
    user="postgres",
    password="postgres"
)

# Create the Course table if it doesn't exist
create_table_query = """
    CREATE TABLE IF NOT EXISTS course (
        id SERIAL PRIMARY KEY,
        department VARCHAR(50) NOT NULL,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        semester VARCHAR(20) NOT NULL,
        teacher VARCHAR(255) NOT NULL,
        UNIQUE (department, code, name, semester, teacher)
    )
"""

with conn.cursor() as cursor:
    cursor.execute(create_table_query)
    conn.commit()

# Read the data from the CSV file
csv_file_path = "./class_data.csv"
with open(csv_file_path, "r") as file:
    reader = csv.reader(file)

    for row in reader:
        if len(row) != 4:
            continue

        class_code = row[0]
        department, code = class_code.split(" ")  # Split the class code into department and code
        name = row[1].strip('"')
        semester = row[3]
        teachers = [t.strip('"') for t in row[2].split(",")] if "," in row[2] else [row[2].strip('"')]

        # Insert the data into the Course table
        for teacher in teachers:
            insert_query = """
                INSERT INTO course (department, code, name, semester, teacher)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (department, code, name, semester, teacher) DO NOTHING
            """
            with conn.cursor() as cursor:
                cursor.execute(insert_query, (department, code, name, semester, teacher))
                conn.commit()

# Close the database connection
conn.close()
