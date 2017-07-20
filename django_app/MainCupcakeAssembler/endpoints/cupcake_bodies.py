#Author: David Vitale

from django.http import JsonResponse
from django.core import serializers

from MainCupcakeAssembler.models import Body

def get_bodies(request):
    return JsonResponse(serializers.serialize('json', Body.objects.all()),
                        safe=False)
