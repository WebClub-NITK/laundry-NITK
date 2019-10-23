from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from laundryApi.models import ItemDetails,CustomerDetails,CustomerLaundryDetails,TrackingProgress,PaymentDetails
from laundryApi.serializers import ItemDetailsSerializer,CustomerDetailsSerializer,CustomerLaundryDetailsSerializer
from laundryApi.serializers import TrackingProgressSerializer,PaymentDetailsSerializer
import json

# Create your views here.


class customerDetails(APIView):

    def get(self, request, format=None):
        customer = CustomerDetails.objects.all()
        serializer = CustomerDetailsSerializer(customer, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
# <<<<<<< Updated upstream
        print(request.body)
        json_data = json.loads(str(request.body, encoding='utf-8'))
        print(json_data)
        serializer = CustomerDetailsSerializer(data=json_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# =======
#         # print(request.data)
#         # print("ddssd")
#         try:
#             serializer = CustomerDetailsSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# >>>>>>> Stashed changes

class retreiveCustomerLaundry(APIView):

    def post(self, request, format=None):
        # try:
        key = request.data.get('key')
        # print(key)
        customer = CustomerDetails.objects.get(key = key)
        laundry = CustomerLaundryDetails.objects.filter(customer = customer)
        serializer = CustomerLaundryDetailsSerializer(laundry, many=True)
        return Response(serializer.data)
        # except:
        #     # print("except")
        #     return Response(status=status.HTTP_204_NO_CONTENT)
        # print(data)
        # return Http404

class enterCustomerLaundry(APIView):

    def post(self, request, format=None):
        try:
            key = request.data.get('key')
            # print(key)
            customer = CustomerDetails.objects.get(key = key)
            print(request.data.get('quantity'))
            dic = json.dumps(request.data.get('quantity'))
            dic = json.loads(dic)
            print(dic)
            for x in dic:
                if x=="key":
                    continue
                item = ItemDetails.objects.get(pk = x)
                obj = CustomerLaundryDetails(customer=customer,item=item,quantity=dic[x])
                obj.save()
            # serializer = CustomerLaundryDetailsSerializer(laundry, many=True)
            return Response(status=status.HTTP_201_CREATED)
        except:
            # print("except")
            return Response(status=status.HTTP_204_NO_CONTENT)

class getToken(APIView):

    def post(self, request, format=None):
        blockNo = request.data.get('blockNo')
        roomNo = request.data.get('roomNo')
        objs = CustomerDetails.objects.filter(blockNo=blockNo).filter(roomNo=roomNo)
        data=[]
        for obj in objs :
            dic = dict()
            dic["key"] = obj.key
            dic["name"] = obj.name
            dic["profilePic"] = obj.profilePic
            data.append(dic)
        data = json.dumps(data)
        print(data)
        return Response(data,status=status.HTTP_201_CREATED)
