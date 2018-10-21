from django.db import models

# Create your models here.

# Source model
# The source from which the collections come from (Zoo, Art Musuem, etc)

class Source(models.Model):
    name = models.CharField(max_length = 255, unique = True)

    def __str__(self):
        return self.name

# A Collection of items from a particular source
class Collection(models.Model):

    source = models.ForeignKey(
        'Source',
        on_delete = models.CASCADE
    )

    name = models.CharField(max_length = 255)

    def __str__(self):
        return self.name

# A item that is part of a collection
class Item(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(null = True, blank = True)
    image_link = models.URLField(null = True)
    type = models.CharField(max_length=255, null = True, blank = True)
    collection = models.ForeignKey(
        'Collection',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title

class Choice(models.Model):
    item = models.ForeignKey(
        'Item',
        on_delete = models.CASCADE
    )
    text = models.CharField(max_length=255)
    correct = models.BooleanField(default = False)

    def __str__(self):
        return self.text
