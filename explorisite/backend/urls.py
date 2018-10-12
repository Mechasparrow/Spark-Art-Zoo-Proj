from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('collections/', views.collection_list, name = "collection_list"),
    path('collections/<int:pk>/', views.collection_detail, name = "collection_detail")
]
