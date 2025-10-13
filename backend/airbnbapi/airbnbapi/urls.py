
from django.contrib import admin
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from users.views import home
from .views import AdminListingsViewset , AdminUserViewset , AdminListingDetailViewset , AdminUserDetailViewset
from django.urls import path , include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path("", home), 
    path('director/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    #Users Endpoint
    path('api/auth/', include('users.urls')),
    #Listing Endpoint
    path('api/listings/',include('listings.urls')),
    #Bookings Endpoint
    path("api/bookings/", include("bookings.urls")),


    # JWT TOKEN PATH
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),



    # Admin Access Paths
    path('api/admin/listings/', AdminListingsViewset.as_view() , name="admin_listing_view"),
    path('api/admin/listings/<int:pk>', AdminListingDetailViewset.as_view() , name="admin_listingDetail_view"),
    path('api/admin/users/', AdminUserViewset.as_view() , name="admin_users_view"),
    path('api/admin/users/<int:pk>', AdminUserDetailViewset.as_view() , name="admin_usersDetail_view"),

    # Docs API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'), # This one Downloads the YAML file to you local device
    # Optional UI:
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]
