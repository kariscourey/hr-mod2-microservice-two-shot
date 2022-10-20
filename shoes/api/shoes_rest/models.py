from django.db import models

class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    bin_number = models.PositiveSmallIntegerField(null=True)

class Shoe(models.Model):
    model = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    shoe_bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )
