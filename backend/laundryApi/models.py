from django.db import models

# Create your models here.
class ItemDetails(models.Model):
    item = models.CharField(max_length=100)
    amount = models.IntegerField()

class CustomerDetails(models.Model):
    key = models.CharField(max_length = 100)
    roomNo = models.CharField(max_length = 100)
    blockNo = models.CharField(max_length = 100)
    name = models.CharField(max_length = 100)
    email = models.CharField(max_length = 100)
    phoneNo = models.CharField(max_length = 100)
    profilePic =  models.CharField(max_length = 100)
    pushToken = models.CharField(max_length=100,default="token")

class CustomerLaundryDetails(models.Model):
    customer = models.ForeignKey(CustomerDetails,on_delete=models.CASCADE,default=None)
    dateGiven = models.DateField(auto_now_add=True)
    item = models.ForeignKey(ItemDetails,on_delete=models.CASCADE,default=None)
    datePickup = models.DateField(null=True,blank=True)
    quantity = models.IntegerField()

class TrackingProgress(models.Model):
    customer = models.ForeignKey(CustomerDetails,on_delete=models.CASCADE,default=None)
    dateGiven = models.DateField(auto_now_add=True)
    readyToPick = models.BooleanField(default=False)

class PaymentDetails(models.Model):
    customer = models.ForeignKey(CustomerDetails,on_delete=models.CASCADE,default=None)
    dateGiven = models.DateField(auto_now_add=True)
    amount = models.IntegerField()
