from django.db import models

class Drug(models.Model):
    row = models.CharField(max_length=100, blank=True, null=True)
    genericCode = models.CharField(max_length=100, blank=True, null=True)
    brandCode = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    treatmentGroup = models.CharField(max_length=100, blank=True, null=True)
    shape = models.CharField(max_length=100, blank=True, null=True)
    dosage = models.CharField(max_length=100, blank=True, null=True)
    price = models.CharField(max_length=100, blank=True, null=True)
    percent = models.CharField(max_length=100, blank=True, null=True)
    commitmentCondition = models.CharField(max_length=100, blank=True, null=True)
    detail = models.CharField(max_length=100, blank=True,null=True)