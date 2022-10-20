from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import LocationVO, Hat
from common.json import ModelEncoder
import json

# Create your views here.
class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href","section_number","shelf_number"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "model",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location"
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }



@require_http_methods(["GET", "POST"])
def api_list_hats(request,):

    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        # # Get the Conference object and put it in the content dict
        # try:
        #     conference_href = f"/api/conferences/{conference_vo_id}/"
        #     conference = ConferenceVO.objects.get(import_href=conference_href)
        #     content["conference"] = conference
        # except ConferenceVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid conference id"},
        #         status=400,
        #     )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
