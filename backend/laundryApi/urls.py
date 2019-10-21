from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('customerDetails/',views.customerDetails.as_view()),
    path('customerLaundry/',views.customerLaundry.as_view()),
    ]
