from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('customerDetails/',views.customerDetails.as_view()),
    path('retreiveCustomerLaundry/',views.retreiveCustomerLaundry.as_view()),
    path('enterCustomerLaundry/',views.enterCustomerLaundry.as_view()),
    path('getToken/',views.getToken.as_view()),
    path('getProfileForNotification/',views.getProfileForNotification.as_view()),
    path('notify/',views.Notify.as_view()),
    path('payment/',views.Payment.as_view())
    ]
