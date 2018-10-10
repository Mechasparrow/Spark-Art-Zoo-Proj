# libs
from bs4 import BeautifulSoup
import csv
import requests
import json
from io import StringIO

# Models
from models import Item
from models import Collection

# helper function for retrieving html
def get_html(route):
    r = requests.get(route)
    return (r.text)

# Base scraper class
class Scraper:

    # constructor for Scraper.
    # Takes in a route to scrape from.
    def __init__(self, core_route):
        self.core_route = core_route
        self.scraped_collections = []

    # take the scraped data and convert it to a dictionary
    def scraped_data_dict_array(self):

        collections_dicts = []
        for scraped_collection in self.scraped_collections:
            collections_dicts.append(scraped_collection.__dict__())

        return collections_dicts

    # get the data as json
    def scraped_data_json(self):
        collection_dicts = self.scraped_data_dict_array()
        return json.dumps(collection_dicts)

    # grabs an item based off its route
    def get_item(self, item_route):
        pass

    # grabs a collection based off a route
    def retrieve_collection(self, collection_route):
        pass

# Scraper for the Art Museum by its base route
class ArtScraper(Scraper):

    # inherits from Scraper Model
    def __init__(self, core_route):
        super().__init__(core_route)

    # grabs the painting
    def get_item(self, item_route):

        painting_route = self.core_route + item_route

        print ("retrieving painting info...")

        html = get_html(painting_route)
        soupy = BeautifulSoup(html, 'html.parser')

        title = soupy.find('div', class_ = "titleField").h1.text

        artist = soupy.find('div', class_ = "peopleField").h4.find("span", class_ = "detailFieldValue").span.text

        location = soupy.find('div', class_ = "locationsField").find('span', class_ = "detailFieldValue").text

        try:
            notes = soupy.find('div', class_ = "notesField").find('span', class_ = "detailFieldValue").text
        except AttributeError:
            notes = None

        try:
            image = self.core_route + soupy.find('div', class_ = "emuseum-img-wrap").find('img')['src']
        except AttributeError:
            image = None

        painting_item = Item(title, notes, artist, location, image, type="Painting")

        return painting_item

    # grabs painting items
    def get_items(self, works_route, amnt_of_items = None):

        starter_route = works_route + '/objects'
        pagination_input = False

        items = []

        #following paginations
        while (pagination_input != None):

            if (amnt_of_items != None):
                if (len(items) >= amnt_of_items):
                    break

            # if we are on first run through
            if (pagination_input == False):
                route = self.core_route + starter_route
            # if we are on the any other run through
            else:
                pagination_route = pagination_input['href']
                route = self.core_route + pagination_input['href']

            html = get_html(route)
            soupy = BeautifulSoup(html, 'html.parser')
            works = soupy.find_all('div', class_="result")
            pagination_input = soupy.find('a', class_ = 'next-page-link')

            for work in works:

                if (amnt_of_items != None):
                    if (len(items) >= amnt_of_items):
                        break

                work_a = work.find('a')
                work_link = work_a['href']

                item = self.get_item(work_link)

                items.append(item)

        return items

    # grab the collection routes
    def collection_routes(self):
        scrape_route = self.core_route + '/collections/'
        html_doc = get_html(scrape_route)
        soup = BeautifulSoup(html_doc, 'html.parser')

        filtered_soup= soup.find_all("div", class_="text-wrap")

        collection_links = []

        for elem in filtered_soup:
            href = elem.find('a')['href']
            collection_links.append(href)

        return collection_links

    # retrieve all the collections
    # takes in the number of items per as collection_size
    def retrieve_collections(self, save_collections = False, collection_size = None):

        collection_routes = self.collection_routes()

        retrieved_collections = []

        for route in collection_routes:
            retrieved_collection = self.retrieve_collection(route, collection_size)
            retrieved_collections.append(retrieved_collection)

        if (save_collections == True):
            self.scraped_collections = retrieved_collections

        return retrieved_collections

    # retrieve a single collection by its route and amount of items to retrieve per collection
    def retrieve_collection(self, collection_route, collection_size = None):

        collection_html_doc = get_html(self.core_route + collection_route)

        collection_soup = BeautifulSoup(collection_html_doc, 'html.parser')

        collection_title = collection_soup.find("div", class_ = "item-details-inner").find("div", class_="detailField").h1.text
        collection_items = self.get_items(collection_route, collection_size)

        return Collection(collection_title, collection_items)

# Painting scraper by its csv
class CSVPaintingScraper(Scraper):

    # uses Scraper as its base
    # add
    #
    # csv_route attribute
    # core_route (art museum)
    # grab the csv text from google spreadsheets
    # parsed_csv has the csv parsed into Python Dictionary

    def __init__(self, core_route, csv_route):
        super().__init__(core_route)

        self.csv_route = csv_route

        # parse the csv for consumption

        # get the csv request
        request = requests.get(csv_route)
        # reads the csv text
        csv_text = request.content.decode('utf-8')

        self.parsed_csv = CSVPaintingScraper.parse_csv(csv_text)

    # parses the art museum csv text data
    def parse_csv(csv_text):
        data = []
        fields = []

        csv_file = StringIO(csv_text)
        csvreader = csv.reader(csv_file, delimiter = ",")
        print (csvreader)

        firstrow = True
        for row in csvreader:

            if (firstrow):
                fields = row
                firstrow = False
            else:
                formatted_row = []

                i = 0
                for item in row:
                    formatted_row.append((fields[i], item))
                    i+=1

                formatted_row_dict = dict(formatted_row)
                data.append(formatted_row_dict)

        return data

    # get the items per csv row formatted correctly
    def get_row_items (self):

        csv_items = []
        for row in self.parsed_csv:
            csv_item = {
                'Collection': row['Collection'],
                'Link': row['Link']
            }
            csv_items.append(csv_item)

        return csv_items

    # get the collections referenced with the painting item links
    def get_collections_with_links(self):

        row_items = self.get_row_items()

        collections_with_links = {}
        collections_with_links_array = []

        for row in row_items:

            row_collection = row['Collection']
            row_link = row['Link']

            if not (row_collection in collections_with_links):
                collections_with_links[row_collection] = []

            collections_with_links[row_collection].append(row_link)


        for key, val in collections_with_links.items():
            collections_with_links_array.append(
                {
                    "title": key,
                    "links": val
                }
            )

        return collections_with_links_array

    # get a painting item from the art musuem with the item_route
    def get_item(self, item_route):

        painting_route = item_route

        print ("retrieving painting info...")

        html = get_html(painting_route)
        soupy = BeautifulSoup(html, 'html.parser')

        title = soupy.find('div', class_ = "titleField").h1.text

        artist = soupy.find('div', class_ = "peopleField").h4.find("span", class_ = "detailFieldValue").span.text

        location = soupy.find('div', class_ = "locationsField").find('span', class_ = "detailFieldValue").text

        try:
            notes = soupy.find('div', class_ = "notesField").find('span', class_ = "detailFieldValue").text
        except AttributeError:
            notes = None

        try:
            image = self.core_route + soupy.find('div', class_ = "emuseum-img-wrap").find('img')['src']
        except AttributeError:
            image = None

        painting_item = Item(title, notes, artist, location, image, type="Painting")

        return painting_item

    # retrieve an art collection based off the csv collection title and its corresponding links
    def retrieve_csv_collection(self, collection_with_links):

        collection_title = collection_with_links['title']
        collection_links = collection_with_links['links']

        items = []
        for link in collection_links:
            item = self.get_item(link)
            items.append(item)

        return Collection(collection_title, items)

    # retrieve all the csv collections
    def retrieve_collections(self, save_collections = False):

        collections_with_links = self.get_collections_with_links()

        retrieved_collections = []

        for collection_with_links in collections_with_links:
            retrieved_collection = self.retrieve_csv_collection(collection_with_links)
            retrieved_collections.append(retrieved_collection)

        if (save_collections == True):
            self.scraped_collections = retrieved_collections

        return retrieved_collections
