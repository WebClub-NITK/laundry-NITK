from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('customerDetails/',views.customerDetails.as_view()),
    path('retreiveCustomerLaundry/',views.retreiveCustomerLaundry.as_view()),
    path('enterCustomerLaundry/',views.enterCustomerLaundry.as_view()),
    path('getToken/',views.getToken.as_view()),
    path('getProfile/',views.getProfile.as_view())
    ]
