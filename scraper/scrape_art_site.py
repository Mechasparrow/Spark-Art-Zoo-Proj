#
# ./scrape_art_site.py
#
# scrapes the St. Louis Art Musuem Website
#

# import the scraper tools
import modules.scraper as scraper
from modules.scrapers import ArtScraper

import modules.io as scraper_io

# the route for the art museum for scraping
art_musuem_route = 'http://emuseum.slam.org'

# create the art scraper object with the art museum route
art_scraper = ArtScraper(art_musuem_route)

# scrape 2 items for each collection
scraped_collections = art_scraper.retrieve_collections(True, 2)

# conver the scraped collections to json
scraped_collections_json = art_scraper.scraped_data_json()

# save the data to json
scraper_io.save_data(scraped_collections_json, "./scraped_data/web_data.json")
