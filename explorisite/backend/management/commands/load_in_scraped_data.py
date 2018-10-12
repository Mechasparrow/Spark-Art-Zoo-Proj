from django.core.management.base import BaseCommand, CommandError

from backend.models import Collection, Item

class Command(BaseCommand):

    def handle(self, *args, **options):
        """
        loads in the scraped data somehow
        """

        collection = Collection(name = "Test Coll")
        collection.save()


        for i in range(0,10):
            new_item = Item(title = "Meh", author = "mme", location = "no where", description = "nothing", image_link = "", type = "", collection = collection)
            new_item.save()


        print ("saved some testing collection")
