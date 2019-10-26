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
        obj = CustomerDetails.objects.filter(key = json_data["key"])
        if len(obj)>0:
            return Response(status=status.HTTP_201_CREATED)
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
    
        data = json.loads(str(request.body, encoding='utf-8'))
    
        key = data
   

        customer = CustomerDetails.objects.get(key = key)
        print(customer)
        laundries = CustomerLaundryDetails.objects.filter(customer = customer)
        # curr=[]
        # hist=[]
 
        dic_date=dict()
        # for obj in laundries :
        #     if obj.dateGiven not in date:
        #         date.append(dateGiven)
        # var = laundries.values('dateGiven').annotate(dateGiven='dateGiven',)
        # print(var)
        print(laundries)
        finalList=[]
        for obj in laundries:
            d = str(obj.dateGiven)
            if d not in dic_date:
                dic_date[d] = dict()
                dic_date[d]["amount"]=0
                dic_date[d]["datePickup"]=str(obj.datePickup)
                dic_date[d]["lis"]=[]
                dic_date[d]["dateGiven"]=d
            dic  = dict()
            dic["item"] = obj.item.item
            dic["quantity"] = obj.quantity
            dic["price"] = obj.item.amount*obj.quantity
            dic_date[d]["amount"] = dic_date[d]["amount"]+dic["price"]
            dic_date[d]["lis"].append(dic)
            print("")
            print(dic_date)
            print("")        

        print(dic_date)
        for x in dic_date:
            finalList.append(dic_date[x])
        # serializer = CustomerLaundryDetailsSerializer(laundry, many=True)
        # print(serializer.data)
        data = json.dumps(finalList)

        return Response(data)
        # except:
        #     # print("except")
        #     return Response(status=status.HTTP_204_NO_CONTENT)
        # print(data)
        # return Http404

class enterCustomerLaundry(APIView):

    def post(self, request, format=None):
        try:
            data = json.loads(str(request.body, encoding='utf-8'))
            print(data)
            key = data["key"]
            # print(key)
            customer = CustomerDetails.objects.get(key = key)
            # print(request.data.get('quantity'))
            dic = json.dumps(data["quantity"])
            dic = json.loads(dic)
            print(dic)
            for x in dic:
                if x=="key":
                    continue
                if dic[x]==0:
                    continue
                item = ItemDetails.objects.get(item = x)
                obj = CustomerLaundryDetails(customer=customer,item=item,quantity=dic[x])
                obj.save()
            # serializer = CustomerLaundryDetailsSerializer(laundry, many=True)
            return Response(status=status.HTTP_201_CREATED)
        except:
            # print("except")
            return Response(status=status.HTTP_204_NO_CONTENT)

class getToken(APIView):

    def post(self, request, format=None):
        print(request.body)
        data = json.loads(str(request.body, encoding='utf-8'))
        blockNo = data["blockNo"]
        roomNo = data["roomNo"]
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
