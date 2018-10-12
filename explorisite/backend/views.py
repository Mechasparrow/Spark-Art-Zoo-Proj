from django.shortcuts import render

# response types
from django.http import HttpResponse, JsonResponse

#csrf
from django.views.decorators.csrf import csrf_exempt

#rest_framework
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

# models and serializers
from backend.models import Collection
from backend.serializers import CollectionSerializer

# Create your views here.

def index(request):
    html = "<p>Hallo</p>"
    return HttpResponse(html)

# Collection JSON Views
@csrf_exempt
def collection_list(request):
    """
    List all the collections or create a new collection
    """

    if (request.method == 'GET'):
        collections = Collection.objects.all()
        serializer = CollectionSerializer(collections, many=True)
        return JsonResponse(serializer.data, safe = False)

    elif (request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = CollectionSerializer(data=data)

        if (serializer.is_valid()):
            serializer.save()
            return JsonResponse(serializer.data, status = 201)

        return JsonResponse(serializer.errors, status = 400)

@csrf_exempt
def collection_detail(request, pk):
    """
    Retrieve, update, or delete a code snippet
    """

    try:
        collection = Collection.objects.get(pk=pk)
    except Collection.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CollectionSerializer(collection)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CollectionSerializer(collection, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)

        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        collection.delete()
        return HttpResponse(status=204)
