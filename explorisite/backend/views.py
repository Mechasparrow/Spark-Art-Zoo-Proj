from django.shortcuts import render, get_object_or_404

# response types
from django.http import HttpResponse, JsonResponse

#csrf
from django.views.decorators.csrf import csrf_exempt

#rest_framework
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework import status, viewsets

# models and serializers
from backend.models import Collection, Item, Source, Choice, Badge
from backend.serializers import CollectionSerializer, ItemSerializer, SourceSerializer, ChoiceSerializer, BadgeSerializer

# Create your views here.

class CollectionViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions for Collection model

    """

    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    @action(detail=True)
    def items(self, request, pk=None):
        collection = self.get_object()

        items = Item.objects.filter(collection=collection)
        item_serializer = ItemSerializer(items, many = True)

        return Response(item_serializer.data)

    @action(detail=True)
    def badge(self, request, pk = None):
        collection = self.get_object()

        badge = get_object_or_404(Badge, collection = collection)
        badge_serializer = BadgeSerializer(badge)

        return Response(badge_serializer.data)

    def perform_create(self, serializer):
        serializer.save()

class BadgeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions for Collection model

    """

    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    def perform_create(self, serializer):
        serializer.save()


class ItemViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`, `update`, and `destroy` actions for Item Model

    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True)
    def choices(self, request, pk = None):
        item = self.get_object()

        choices = Choice.objects.filter(item = item)
        choice_serializer = ChoiceSerializer(choices, many = True)
        return Response(choice_serializer.data)

class SourceViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`, `etc` for Source Model
    """

    queryset = Source.objects.all()
    serializer_class = SourceSerializer

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True)
    def collections(self, request, pk=None):
        source = self.get_object()

        collections = Collection.objects.filter(source = source)
        collection_serializer = CollectionSerializer(collections, many = True)

        return Response(collection_serializer.data)

class ChoiceViewSet(viewsets.ModelViewSet):
    """
    This viewset provided `list`, `create`, `retrieve`, etc for Choice Model
    """

    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

    def perform_create(self, serializer):
        serializer.save()
