import json

class Item:

    def __init__(self, title, description, author, location, image_link, type=None):
        self.title = title
        self.author = author
        self.location = location
        self.description = description
        self.image_link = image_link
        self.type = type

    def __dict__(self):

        return {
            "title": self.title,
            "author": self.author,
            "location": self.location,
            "description": self.description,
            "image_link": self.image_link,
            "type": self.type
        }

    def __str__(self):
        dict = self.__dict__()
        return json.dumps(dict)

    def __json__(self):
        return self.__str__()
