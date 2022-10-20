import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
from shoes_rest.models import BinVO

def get_bins():
    res = requests.get('http://wardrobe-api:8000/api/bins/')
    content = json.loads(res.content)
    # print(type(content))
    # print(content)

    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href=bin["href"],
            defaults={
                'bin_number': bin['bin_number'],
                'closet_name': bin['closet_name'],
            },
        )
        # print(BinVO.objects.all())


def poll():
    while True:
        try:
            print('Shoes poller polling for data')
            # Write your polling logic, here
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
