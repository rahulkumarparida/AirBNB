
from rest_framework import generics , viewsets
from users.permissions import IsSuperUser , IsSuperUserOrReadOnly
from rest_framework.authentication import BasicAuthentication
from .authentication import AdminAuthentication
from listings.models import HotelsListing
from listings.serializers import HotelsListingSerializer
from users.models import Users
from users.serializers import UserSerializer

class AdminListingsViewset(viewsets.ModelViewSet):
    queryset = HotelsListing.objects.all()
    serializer_class = HotelsListingSerializer
    authentication_classes = [AdminAuthentication]
    permission_classes = [IsSuperUserOrReadOnly]


class AdminUserViewset(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [AdminAuthentication]
    permission_classes = [IsSuperUser]
    

    