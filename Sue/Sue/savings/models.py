from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):

    name = models.CharField(max_length=256)
    details = models.TextField()


class Exchange(models.Model):

    # tag the expense
    category = models.CharField(max_length=256)

    # what was the trade about
    what = models.TextField()
    # date of the trade
    when = models.DateField()
    # who was the trade partner
    where = models.CharField(max_length=256)

    # how much has been exchanged
    # negative means expense
    credit = models.FloatField()

    # put charge on which account
    account = models.ForeignKey(Account)

    # the user who charged the account.
    who = models.ForeignKey(User)

    def income(self):
        return self.credit > 0
