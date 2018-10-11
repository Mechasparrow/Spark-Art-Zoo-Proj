#
# ./scrape_csv.py
#
# scrapes the St. Louis Art Musuem Website via a csv file
#

# import the scraper tools
import modules.scraper as scraper
from modules.scrapers import CSVPaintingScraper

import modules.io as scraper_io

# the routes for the art musuem and csv route
art_musuem_route = 'http://emuseum.slam.org'
csv_route = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpzHSEDr9BL0h35-CzmUHmMJqKCq5qozPbyFMvaY2wvIrpFMdhWVUZaWIhvrVPfeAtef0ZRFk8smTu/pub?gid=0&single=true&output=csv"

# create the art scraper by using the csv file as a source
csv_scraper = CSVPaintingScraper(art_musuem_route, csv_route)

# Retrieve the collections
csv_scraper.retrieve_collections(True)

# Get the collections json
scraped_collections_json = csv_scraper.scraped_data_json()

# save the scraper data to json
scraper_io.save_data(scraped_collections_json, "./scraped_data/csv_data.json")
