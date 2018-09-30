import modules.scraper as scraper
import modules.io as scraper_io


html = scraper.get_html('http://docs.python-requests.org/en/master/user/quickstart/#make-a-request')

art_musuem_route = 'http://emuseum.slam.org'

art_scraper = scraper.ArtScraper(art_musuem_route)

collection_routes = art_scraper.collection_routes()

collection_to_scrape = collection_routes[0]

scraped_collections = art_scraper.retrieve_collections(True, 2)

scraped_collections_json = art_scraper.scraped_data_json()

scraper_io.save_data(scraped_collections_json, "./scraped_data/data.json")
