from bs4 import BeautifulSoup

import urllib.request

def get_html(route):
    with urllib.request.urlopen(route) as response:
        html = response.read()
        return html

# Save the scrape data
def save_scrape(scrape_data):
    pass

def retrieve_painting_info(core_route, painting_route):

    route = core_route + painting_route

    print ("retrieving painting info...")

    html = get_html(route)
    soupy = BeautifulSoup(html, 'html.parser')

    # get painting info
    title = soupy.find('div', class_ = "titleField").h1.text

    location = soupy.find('div', class_ = "locationsField").find('span', class_ = "detailFieldValue").text

    try:
        notes = soupy.find('div', class_ = "notesField").find('span', class_ = "detailFieldValue").text
    except AttributeError:
        notes = None

    try:
        image = soupy.find('div', class_ = "emuseum-img-wrap").find('img')['src']
    except AttributeError:
        image = None


    painting = {
        "title": title,
        "location": location,
        "notes": notes,
        "image": image
    }

    return painting

def get_objects(core_route, works_route):

    #initial run through
    starter_route = works_route + '/objects'
    pagination_input = False

    paintings = []

    #following paginations
    while (pagination_input != None):

        # if we are on first run through
        if (pagination_input == False):
            route = core_route + starter_route
        # if we are on the any other run through
        else:
            pagination_route = pagination_input['href']
            route = core_route + pagination_input['href']

        html = get_html(route)
        soupy = BeautifulSoup(html, 'html.parser')
        works = soupy.find_all('div', class_="result")
        pagination_input = soupy.find('a', class_ = 'next-page-link')

        for work in works:
            work_a = work.find('a')
            work_link = work_a['href']

            painting = retrieve_painting_info(core_route, work_link)

            paintings.append(painting)

    return paintings


# Tests
def test_painting_retrieval(core_route, testing_route = '/objects/5525/axe?ctx=fc9d682b-8387-4625-92af-ec80cc2b4f08&idx=1'):
    painting_info = retrieve_painting_info(core_route, testing_route)
    print (painting_info)

# Main run function
def run():

    # setup the main scraping route
    core_route = 'http://emuseum.slam.org'

    print ("running tests...")
    test_painting_retrieval(core_route)

    print ("begin scraping...")

    # route where scraping actually starts
    scrape_route = core_route + '/collections/'

    html_doc = get_html(scrape_route)
    soup = BeautifulSoup(html_doc, 'html.parser')

    filtered_soup= soup.find_all("div", class_="text-wrap")

    collections = []

    cnt = 0
    for elem in filtered_soup:
        collection = {}

        title = elem.find('h3')['title']
        href = elem.find('a')['href']

        collection['title'] = title
        collection['href'] = href
        paintings = get_objects(core_route, href)
        collection['paintings'] = paintings

        collections.append(collection)

        if (cnt > 0):
            break
        cnt+=1

    print (collections)

if __name__ == "__main__":
    run()
