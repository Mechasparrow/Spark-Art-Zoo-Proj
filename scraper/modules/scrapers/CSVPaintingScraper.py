# libs
from bs4 import BeautifulSoup
import csv
import requests
import json
from io import StringIO

# Models
from models import Item
from models import Collection

from ..scraper import get_html, Scraper

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
