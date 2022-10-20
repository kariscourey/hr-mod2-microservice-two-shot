from django.db import models

# Create your models here.

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)

class Hat(models.Model):
    model = models.CharField(max_length=200)
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    Location = models.ForeignKey(
        LocationVO,
        related_name="Hats",
        on_delete=models.CASCADE,
    )
