from django.core.management.base import BaseCommand, CommandError

from backend.models import Collection, Item
from backend.rawdata import LoadData

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        loads in the scraped data somehow
        """

        raw_data = LoadData()

        collections_names = []

        # Model deletino
        Collection.objects.all().delete()
        Item.objects.all().delete()

        for collection in raw_data:
            collection_name = collection['name']
            items = collection['items']



            collection = Collection(name = collection_name)
            collection.save()

            for item in items:
                new_item = Item(title = item['title'], author = item['author'], location = item['location'] , description = item['description'], image_link = item['image_link'], type = item['type'], collection = collection)
                new_item.save()

        print ("collections saved")
