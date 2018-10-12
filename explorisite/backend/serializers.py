from rest_framework import serializers
from . import models

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Collection
        fields = ('id', 'name')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Item
        fields = ('title', 'author', 'location', 'description', 'image_link', 'type', 'collection')
