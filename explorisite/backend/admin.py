from django.contrib import admin

# Register your models here.
from . import models

# Collection admin form
admin.site.register(models.Collection)

# Item admin form
class ChoiceInline(admin.StackedInline):
    model = models.Choice
    extra = 4

class ItemAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]

# Item admin form
admin.site.register(models.Item, ItemAdmin)

# Choice admin form
admin.site.register(models.Choice)

# Selection admin form
admin.site.register(models.Source)
