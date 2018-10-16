import json
import os

# loads the data from the scraped data folder

def LoadData():
    print ("loading data...")

    root_path = os.path.dirname(os.path.realpath(__file__))

    with open(root_path + '/scraped_data/web_data.json') as json_data:
        d = json.load(json_data)
        json_data.close()
        return d
