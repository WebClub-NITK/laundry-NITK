from django.contrib import admin

# Register your models here.
from .models import ItemDetails,CustomerDetails,CustomerLaundryDetails,TrackingProgress,PaymentDetails

admin.site.register(ItemDetails)
admin.site.register(CustomerDetails)
admin.site.register(CustomerLaundryDetails)
admin.site.register(TrackingProgress)
admin.site.register(PaymentDetails)
