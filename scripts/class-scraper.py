from bs4 import BeautifulSoup
import csv
import requests

def getDescription(course_id, cell, desc_writer):
    link = cell.find('a')
    if link is None:
        return
    
    url = link.get('href')
    print(course_id)
    print(url)
    response = requests.get(url)
    content = response.text
    print(content)

    soup = BeautifulSoup(content, 'html.parser')
    table = soup.find("table", { "class": "datadisplaytable" })

    description = table.find('td', { "class": "ntdefault" })
    row = [ course_id, description ]
    desc_writer.writerow(row)

print("Starting the scraper...")
sitemap = 'https://www.cs.purdue.edu/sitemap.html'

sitemap_response = requests.get(sitemap)
sitemap_content = sitemap_response.text

sitemap_soup = BeautifulSoup(sitemap_content, 'html.parser')

# Find all the links in the sitemap
sitemap_links = sitemap_soup.find_all('a')

# Extract the URLs from the links
urls = []
for link in sitemap_links:
    url = link.get('href')
    if url.startswith('academic-programs/courses/') and url.endswith('_courses.html'):
        full_url = "https://www.cs.purdue.edu/" + url
        urls.append(full_url)

# Open a CSV file to write the data
print("Writing to CSV file(s): class_data.csv, desc_data.csv")
with open('class_data.csv', 'w', newline='') as csv_file, open("desc_data.csv", 'w', newline='') as desc_file:
    # Create a writer object to write to the CSV file
    writer = csv.writer(csv_file)
    desc_writer = csv.writer(desc_file)

    found_courses = set()

    # Iterate over each URL
    for url in urls:
        if 'fall' in url:
            time = 'fall'
        elif 'spring' in url:
            time = 'spring'
        else:
            time = 'summer'

        # Make an HTTP request to retrieve the HTML content
        response = requests.get(url)
        content = response.text

        # Create a BeautifulSoup object and specify a html parser
        soup = BeautifulSoup(content, 'html.parser')

        # Find the table of courses (undergraduate)
        tables = soup.find_all('table')

        # Iterate over each table
        for table in tables:
            # Find all the rows in the table
            rows = table.find_all('tr')

            # Iterate over the rows
            for row in rows:
                # Find all the cells in the row
                cells = row.find_all('td')

                # Get the text from each cell
                cell_contents = []
                for i, cell in enumerate(cells):
                    if cell.get_text(strip=True) != '' and cell.get_text(strip=True) != 'Time':
                        if i == 2 and cell.find('a'): # Check if the cell is a teacher cell
                            teachers = cell.find_all('a')
                            teacher_names = []
                            for teacher in teachers:
                                link = teacher.get('href')
                                if link and link.startswith('../../people/faculty/') and link.endswith('.html'):
                                    teacher_names.append(teacher.get_text(strip=True))
                            if teacher_names:
                                cell_contents.append(', '.join(teacher_names))
                        elif i == 0: # Check if course identifier file
                            course_id = cell.get_text(strip=True)
                            if course_id in found_courses:
                                getDescription(course_id, cell, desc_writer)
                            else:
                                found_courses.add(course_id)
                            cell_contents.append(cell.get_text(strip=True))
                        else: 
                            cell_contents.append(cell.get_text(strip=True))

                if cell_contents:
                    cell_contents.append(time)
                    writer.writerow(cell_contents)

print("Finished scraping!")
