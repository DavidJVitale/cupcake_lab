"""MainCupcakeAssembler URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

import sys, os

from django.conf.urls import url
from django.contrib import admin

#Allow files from the 'endpoints' folder to be imported
from settings import BASE_DIR
sys.path.insert(0, os.path.join(BASE_DIR, 'MainCupcakeAssembler/endpoints'))

from cupcake_bodies import get_bodies
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^api/cupcakebodies/', get_bodies, name='bodies')
]
