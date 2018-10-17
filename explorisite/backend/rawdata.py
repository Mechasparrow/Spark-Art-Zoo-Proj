import json
import os

from backend.models import Collection, Item, Source

# loads the data from the web scraped data
def LoadArtScrapedData():
    print ("loading data...")

    root_path = os.path.dirname(os.path.realpath(__file__))

    with open(root_path + '/scraped_data/art_web_data.json') as json_data:
        d = json.load(json_data)
        json_data.close()
        return d

# loads the data from the csv scraped data
def LoadArtCSVData():
    print ("loading data...")

    root_path = os.path.dirname(os.path.realpath(__file__))

    with open(root_path + '/scraped_data/art_csv_data.json') as json_data:
        d = json.load(json_data)
        json_data.close()
        return d

# Saves the scraped data to a database
def SaveDataToDB(data, overwrite = False):
    # grabs the raw json data
    raw_data = data
    collections_names = []

    # Model deletion if overwrite is enabled

    if (overwrite == True):
        Collection.objects.all().delete()
        Item.objects.all().delete()

    source_name = data[0]['items'][0]['type']

    try:
        source = Source.objects.get(name = source_name)
    except Source.DoesNotExist:
        source = Source(name = source_name)
        source.save()


    # populates the database
    for collection in raw_data:
        collection_name = collection['name']
        items = collection['items']

        collection = Collection(name = collection_name, source = source)
        collection.save()

        for item in items:
            new_item = Item(title = item['title'], author = item['author'], location = item['location'] , description = item['description'], image_link = item['image_link'], type = item['type'], collection = collection)
            new_item.save()

    print ("collections saved")
