#Author: David Vitale

import os

from django.http import HttpResponse

def index(request):
    current_dir = os.path.dirname(__file__)
    index_html_file = open(os.path.join(current_dir, 'index.html')) 
    return HttpResponse(index_html_file.read())
