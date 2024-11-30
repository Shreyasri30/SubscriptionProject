from django.urls import path
from . import views  

urlpatterns = [
    path('add_subscription/', views.add_subscription, name='add_subscription'),
    path('extend_subscription/', views.extend_subscription, name='extend_subscription'),
    path('end_subscription/', views.end_subscription, name='end_subscription'),
    path('customers/', views.customer_list, name='customer_list'),
    path('products/', views.product_list, name='product_list'),
    path('revenue_report/', views.revenue_report, name='revenue_report'),

]
