import json

class Collection:

    def __init__(self, name, items):
        self.name = name
        self.items = items

    def __dict__(self):

        item_dicts = []
        for item in self.items:
            item_dicts.append(item.__dict__())

        return {
            "name": self.name,
            "items": item_dicts
        }


    def __json__(self):
        json_str = json.dumps(self.__dict__())
        return json_str

    def __str__(self):
        return self.__json__()
