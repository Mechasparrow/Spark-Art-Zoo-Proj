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
