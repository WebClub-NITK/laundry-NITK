from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from laundryApi.models import ItemDetails,CustomerDetails,CustomerLaundryDetails,TrackingProgress,PaymentDetails
from laundryApi.serializers import ItemDetailsSerializer,CustomerDetailsSerializer,CustomerLaundryDetailsSerializer
from laundryApi.serializers import TrackingProgressSerializer,PaymentDetailsSerializer

# Create your views here.


class customerDetails(APIView):

    def get(self, request, format=None):
        customer = CustomerDetails.objects.all()
        serializer = CustomerDetailsSerializer(customer, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomerDetails(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class customerLaundry(APIView):

    def post(self, request, format=None):
        try:
            rollNo = request.data.get('token')
            print(rollNo)
            customer = CustomerDetails.objects.get(rollNo = rollNo)
            laundry = CustomerLaundryDetails.objects.filter(customer = customer)
            serializer = CustomerLaundryDetailsSerializer(laundry, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        # print(data)
        # return Http404
