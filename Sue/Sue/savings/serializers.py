from Sue.savings.models import Account, Exchange
from rest_framework import serializers


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('name',)


class ExchangeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Exchange
        fields = ('pk', 'category', 'what', 'where', 'when', 'credit', 'account', 'who')
