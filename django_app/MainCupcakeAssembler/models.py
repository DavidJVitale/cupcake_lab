from django.db import models

class Body(models.Model):
    body_name = models.CharField(max_length=200)
    body_url = models.CharField(max_length=200)
    body_info = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
