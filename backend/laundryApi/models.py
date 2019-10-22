from django.db import models

# Create your models here.
class ItemDetails(models.Model):
    item = models.CharField(max_length=100)
    amount = models.IntegerField()

class CustomerDetails(models.Model):
    key = models.CharField(max_length = 20)
    roomNo = models.CharField(max_length = 10)
    blockNo = models.CharField(max_length = 10)
    name = models.CharField(max_length = 20)
    email = models.CharField(max_length = 25)
    phoneNo = models.CharField(max_length = 15)
    profilePic =  models.CharField(max_length = 25)

class CustomerLaundryDetails(models.Model):
    customer = models.ForeignKey(CustomerDetails,on_delete=models.CASCADE,default=None)
    dateGiven = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey(ItemDetails,on_delete=models.CASCADE,default=None)
    datePickup = models.DateTimeField(default=None)
    quantity = models.IntegerField()

class TrackingProgress(models.Model):
    customer = models.ForeignKey(CustomerDetails,on_delete=models.CASCADE,default=None)
    dateGiven = models.DateTimeField(auto_now_add=True)
    readyToPick = models.BooleanField(default=False)

class PaymentDetails(models.Model):
    customer = models.ForeignKey(CustomerDetails,on_delete=models.CASCADE,default=None)
    dateGiven = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
