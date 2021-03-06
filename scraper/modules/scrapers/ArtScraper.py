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
