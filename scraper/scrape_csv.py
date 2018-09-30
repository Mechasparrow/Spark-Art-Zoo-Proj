import modules.scraper as scraper
import modules.io as scraper_io

# get the dummy csv data

art_musuem_route = 'http://emuseum.slam.org'
csv_route = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpzHSEDr9BL0h35-CzmUHmMJqKCq5qozPbyFMvaY2wvIrpFMdhWVUZaWIhvrVPfeAtef0ZRFk8smTu/pub?gid=0&single=true&output=csv"


csv_scraper = scraper.CSVPaintingScraper(art_musuem_route, csv_route)

csv_scraper.retrieve_collections(True)
scraped_collections_json = csv_scraper.scraped_data_json()

scraper_io.save_data(scraped_collections_json, "./scraped_data/csv_data.json")
