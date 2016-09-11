"""
Definition of urls for Sue.
"""
from django.conf.urls import include, url
from django.views.generic import RedirectView
from django.contrib import admin
from rest_framework import routers
from django.contrib.auth.views import login, logout

from Sue import settings
from Sue.start import views
from Sue.savings import views as v
from Sue.services import TemplateService

# discover admin modules
admin.autodiscover()

# define api urls
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'account', v.AccountViewSet)
router.register(r'exchange', v.ExchangeViewSet)

from django.shortcuts import render
from django.views.generic.base import TemplateView

def index(request):
    return render(request, 'index.html')

urlpatterns = [
    # url(r'^$', Sue.views.home, name='home'),
    # Wire up our API using automatic URL routing.
    url(r'^api/', include(router.urls), name="rest_admin"),
    # Additionally, we include login URLs for the browsable API.
    url(r'^auth\/', include("rest_framework.urls", namespace='rest_framework')),
    url(r'^admin\/', include(admin.site.urls)),

    url(r'^login', login, name='login'),
    url(r'^logout', logout, name='logout'),

    url(r'^partials\/(?P<template_name>.*)$', TemplateService.as_view(tempaltefolder='partials'), name='partials'),


    url(r'^snippets/$', views.SnippetList.as_view()),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view()),

    url(r'^$', RedirectView.as_view(url='app/')),
    url(r'^app/.*$', index, name='home')
]

if settings.DEBUG:
    from django.contrib.staticfiles.views import serve
    from django.views.decorators.cache import never_cache
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, view=never_cache(serve))