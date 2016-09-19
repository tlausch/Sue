from Sue.savings.models import Account, Exchange, User
from rest_framework import serializers


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('url', 'pk', 'name',)


class ExchangeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Exchange
        fields = ('url', 'pk', 'category', 'what', 'where', 'when', 'credit', 'account', 'confirmed', 'who')
