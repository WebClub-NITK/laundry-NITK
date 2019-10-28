from rest_framework import serializers
from laundryApi.models import ItemDetails,CustomerDetails,CustomerLaundryDetails,TrackingProgress,PaymentDetails


class ItemDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemDetails
        fields = ['item','amount']

class CustomerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerDetails
        fields = ['key','roomNo','blockNo','name','email','phoneNo','profilePic','pushToken']

class CustomerLaundryDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLaundryDetails
        fields = ['customer','dateGiven','item','datePickup','quantity']

class TrackingProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackingProgress
        fields = ['customer','dateGiven','readyToPick']

class PaymentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = ['customer','dateGiven','amount']
