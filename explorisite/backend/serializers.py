from rest_framework import serializers
from . import models

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Collection
        fields = ('id', 'source', 'name')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Item
        fields = ('id', 'title', 'author', 'location', 'description', 'image_link', 'type', 'collection')

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Source
        fields = ('id', 'name')

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Choice
        fields = ('id', 'item', 'text', 'correct')
