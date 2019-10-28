from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from laundryApi.models import ItemDetails,CustomerDetails,CustomerLaundryDetails,TrackingProgress,PaymentDetails
from laundryApi.serializers import ItemDetailsSerializer,CustomerDetailsSerializer,CustomerLaundryDetailsSerializer
from laundryApi.serializers import TrackingProgressSerializer,PaymentDetailsSerializer
import json
from datetime import datetime
from laundryApi.notifications import send_push_message
# import send_push_message from notifications1
# Create your views here.


class customerDetails(APIView):

    def get(self, request, format=None):
        customer = CustomerDetails.objects.all()
        serializer = CustomerDetailsSerializer(customer, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
# <<<<<<< Updated upstream
        # print(request.body)
        json_data = json.loads(str(request.body, encoding='utf-8'))
        print(json_data["pushToken"])
        print(type(json_data["pushToken"]))
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

        key = data["key"]
        # print(key)

        customer = CustomerDetails.objects.get(key = key)
        # print(customer)
        laundries = CustomerLaundryDetails.objects.filter(customer = customer)
        # curr=[]
        # hist=[]

        dic_date_curr=dict()
        dic_date_hist=dict()
        # for obj in laundries :
        #     if obj.dateGiven not in date:
        #         date.append(dateGiven)
        # var = laundries.values('dateGiven').annotate(dateGiven='dateGiven',)
        # print(var)
        # print(laundries)
        finalList=[]
        for obj in laundries:
            date_pickup = str(obj.datePickup)
            # print(date_pickup)
            if date_pickup == "None":
                d = str(obj.dateGiven)
                if d not in dic_date_curr:

                    dic_date_curr[d] = dict()
                    dic_date_curr[d]["amount"]=0
                    dic_date_curr[d]["datePickup"]=str(obj.datePickup)
                    dic_date_curr[d]["lis"]=[]
                    dic_date_curr[d]["dateGiven"]=d
                dic  = dict()
                dic["item"] = obj.item.item
                dic["quantity"] = obj.quantity
                dic["price"] = obj.item.amount*obj.quantity
                dic_date_curr[d]["amount"] = dic_date_curr[d]["amount"]+dic["price"]
                dic_date_curr[d]["lis"].append(dic)
                # print("")
                # print(dic_date_curr)
                # print("")
            else:
                d = str(obj.dateGiven)
                if d not in dic_date_hist:

                    dic_date_hist[d] = dict()
                    dic_date_hist[d]["amount"]=0
                    dic_date_hist[d]["datePickup"]=str(obj.datePickup)
                    dic_date_hist[d]["lis"]=[]
                    dic_date_hist[d]["dateGiven"]=d
                dic  = dict()
                dic["item"] = obj.item.item
                dic["quantity"] = obj.quantity
                dic["price"] = obj.item.amount*obj.quantity
                dic_date_hist[d]["amount"] = dic_date_hist[d]["amount"]+dic["price"]
                dic_date_hist[d]["lis"].append(dic)
        #         print("")
        #         print(dic_date_hist)
        #         print("")
        # print(dic_date_curr)
        # print(dic_date_hist)
        for x in dic_date_curr:
            finalList.append(dic_date_curr[x])
        for x in dic_date_hist:
            finalList.append(dic_date_hist[x])
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
            print(key)
            customer = CustomerDetails.objects.get(key = key)
            pushToken = customer.pushToken
            send_push_message(pushToken,"your laundry is added")
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

class getProfile(APIView):

    def put(self, request, format=None):
        data = json.loads(str(request.body, encoding='utf-8'))
        # blockNo = data["blockNo"]
        # roomNo = data["roomNo"]
        objs = CustomerLaundryDetails.objects.filter(dateGiven=data["date"])
        data=[]
        lis_keys=[]
        for obj in objs :
            dic = dict()
            if obj.key in lis_keys:
                continue
            lis_keys.append(obj.key)
            dic["key"] = obj.key
            dic["name"] = obj.name
            dic["profilePic"] = obj.profilePic
            dic["blockNo"] = obj.blockNo
            dic["roomNo"] = obj.roomNo
            data.append(dic)
        data = json.dumps(data)
        print(data)
        return Response(data,status=status.HTTP_201_CREATED)

class Payment(APIView):

    def post(self, request, format=None):
    
        data = json.loads(str(request.body, encoding='utf-8'))
        print(data)
        customer = CustomerDetails.objects.get(key=data["key"])
        objs = CustomerLaundryDetails.objects.filter(dateGiven=data["date"]).filter(customer=customer)
        # date = datetime.datetime.today()
        for obj in objs :
            obj.datePickup = datetime.today().strftime('%Y-%m-%d')
            obj.save()
        return Response(status=status.HTTP_201_CREATED)