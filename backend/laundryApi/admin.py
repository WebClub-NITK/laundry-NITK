from django.contrib import admin
from .models import ItemDetails, CustomerDetails, CustomerLaundryDetails, TrackingProgress, PaymentDetails
# Register your models here.

admin.site.register(ItemDetails)
admin.site.register(CustomerDetails)
admin.site.register(CustomerLaundryDetails)
admin.site.register(TrackingProgress)
admin.site.register(PaymentDetails)
