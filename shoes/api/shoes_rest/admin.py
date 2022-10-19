from django.contrib import admin

from .models import Shoe


@admin.register(Shoe)
class AttendeeAdmin(admin.ModelAdmin):
    pass
