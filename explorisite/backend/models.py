from django.db import models

# Create your models here.

class Source(models.Model):
    name = models.CharField(max_length = 255, unique = True)

class Collection(models.Model):

    source = models.ForeignKey(
        'Source',
        on_delete = models.CASCADE
    )

    name = models.CharField(max_length = 255)

    def __str__(self):
        return self.name

class Item(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(null = True)
    image_link = models.URLField(null = True)
    type = models.CharField(max_length=255)
    collection = models.ForeignKey(
        'Collection',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title
