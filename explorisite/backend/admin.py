from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Collection)
admin.site.register(models.Item)