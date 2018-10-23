from django.contrib import admin

# Register your models here.
from . import models

# Choice admin form
class ChoiceInline(admin.StackedInline):
    model = models.Choice
    extra = 4

# Item admin form
class ItemAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]

# Collection admin form
admin.site.register(models.Collection)
# Item admin form
admin.site.register(models.Item, ItemAdmin)

# Choice admin form
admin.site.register(models.Choice)

# Selection admin form
admin.site.register(models.Source)

# Badge form
admin.site.register(models.Badge)
