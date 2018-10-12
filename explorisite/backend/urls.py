from django.urls import path, include

from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'collections', views.CollectionViewSet)
router.register(r'items', views.ItemViewSet)

urlpatterns = [
    path('', include(router.urls))
]
