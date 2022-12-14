from django.urls import path

from .views import api_list_hats

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path(
        "locations/hats/",
        api_list_hats,
        name="api_list_hats",
    ),
]
