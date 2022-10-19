from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Shoe, BinVO
from common.json import ModelEncoder
import json


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "model",
        ]


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {'shoes': shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            shoe_bin = Shoe.objects.get(id=content["shoe_bin"])
            content["shoe_bin"] = shoe_bin
        except Shoe.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid shoe bin id'},
                status=400,
            )
