#
# ./models/Collection.py
# Collection Model
#
# A collection has a name and items
#

import json

class Collection:

    # collection constructor
    def __init__(self, name, items):
        self.name = name
        self.items = items

    # convert model to dictionary
    def __dict__(self):

        item_dicts = []
        for item in self.items:
            item_dicts.append(item.__dict__())

        return {
            "name": self.name,
            "items": item_dicts
        }

    # return json version of object
    def __json__(self):
        json_str = json.dumps(self.__dict__())
        return json_str

    # string version of the Collection model
    def __str__(self):
        return self.__json__()
