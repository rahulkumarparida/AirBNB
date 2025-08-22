from django.contrib import admin
from listings.models import RoomList , HotelImages , HotelsListing , Location
# Register your models here.
admin.site.register(RoomList)
admin.site.register(HotelImages)
admin.site.register(HotelsListing)
admin.site.register(Location)