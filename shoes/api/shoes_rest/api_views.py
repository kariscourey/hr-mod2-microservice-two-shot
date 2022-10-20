from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Shoe, BinVO
from common.json import ModelEncoder
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
        "bin_number",
    ]

# class ShoeListEncoder(ModelEncoder):
#     model = Shoe
#     properties = [
#         "id",
#         "model",
#         ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "model",
        "manufacturer",
        "color",
        "picture_url",
        "shoe_bin",
        ]

    encoders = {
            "shoe_bin": BinVODetailEncoder(),
        }



@require_http_methods(["GET", "POST"])
def api_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {'shoes': shoes},
            encoder=ShoeDetailEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            shoe_bin_id = content["shoe_bin"]
            shoe_bin_href = f"/api/bins/{shoe_bin_id}/"
            shoe_bin = BinVO.objects.get(import_href=shoe_bin_href)
            content["shoe_bin"] = shoe_bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid shoe bin id'},
                status=400,
            )

        shoe = Shoe.objects.create(**content)

        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            {'shoe': shoe},
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)

        try:
            if "shoe_bin" in content:
                shoe_bin_href = f"/api/bins/{pk}/"
                shoe_bin = BinVO.objects.get(import_href=shoe_bin_href)
                content["shoe_bin"] = shoe_bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid shoe bin id'},
                status=400,
            )

        Shoe.objects.filter(id=pk).update(**content)

        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
