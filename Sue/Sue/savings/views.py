from django.shortcuts import render
from rest_framework import viewsets

from Sue.savings.models import Account, Exchange
from Sue.savings.serializers import AccountSerializer, ExchangeSerializer


class ExchangeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Exchange.objects.all()
    serializer_class = ExchangeSerializer


class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


def index(request):
    return render(request,
                  )
