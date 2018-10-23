from django.urls import path, include

from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'collections', views.CollectionViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'sources', views.SourceViewSet)
router.register(r'choices', views.ChoiceViewSet)
router.register(r'badges', views.BadgeViewSet)

urlpatterns = [
    path('', include(router.urls))
]
