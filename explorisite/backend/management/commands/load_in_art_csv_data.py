from django.core.management.base import BaseCommand, CommandError

from backend.rawdata import LoadArtCSVData, SaveDataToDB

# load_in_scrape_data command
# seeds the data with csv parsed data from the art museum

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        loads in the scraped data somehow
        """

        # grabs the raw json data
        loaded_data = LoadArtCSVData()

        # Saves the loaded data to the db, and overwrites the collections and items
        SaveDataToDB(loaded_data, overwrite = True)
