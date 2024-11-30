from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, Product, Subscription
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse

@csrf_exempt
def customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all().values('customer_id', 'name') 
        return JsonResponse(list(customers), safe=False, status=200)

@csrf_exempt
def add_customer(request):
    if request.method == "POST":
        customer_id = request.POST.get('customer_id')
        name = request.POST.get('name')
        email = request.POST.get('email')

        if Customer.objects.filter(customer_id=customer_id).exists():
            return JsonResponse({'error': 'Customer already exists'}, status=400)
        customer = Customer.objects.create(customer_id=customer_id, name=name, email=email)
        return JsonResponse({'message': 'Customer added successfully'}, status=201)
    return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)

@csrf_exempt
def product_list(request):
    if request.method == "GET":
        products = Product.objects.all().values('id', 'product_name') 
        return JsonResponse(list(products), safe=False, status=200)

@csrf_exempt
def add_subscription(request):
    if request.method == "POST":
        customer_id = request.POST.get('customer_id')
        product_id = request.POST.get('product_id')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        users = request.POST.get('users')
        try:
            customer = Customer.objects.get(customer_id=customer_id)
            product = Product.objects.get(id=product_id)
        except Customer.DoesNotExist:
            return JsonResponse({'error': 'Customer not found'}, status=404)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)
        subscription = Subscription.objects.create(
            customer=customer,
            product=product,
            start_date=start_date,
            end_date=end_date,
            users=users
        )
        return JsonResponse({'message': 'Subscription added successfully'}, status=201)

@csrf_exempt
def extend_subscription(request):
    if request.method == "POST":
        subscription_id = request.POST.get('subscription_id')
        new_end_date = request.POST.get('new_end_date')
        try:
            subscription = Subscription.objects.get(id=subscription_id)
        except Subscription.DoesNotExist:
            return JsonResponse({'error': 'Subscription not found'}, status=404)
        subscription.end_date = new_end_date
        subscription.save()
        return JsonResponse({'message': 'Subscription extended successfully'}, status=200)
    return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)

@csrf_exempt
def end_subscription(request):
    if request.method == "POST":
        subscription_id = request.POST.get('subscription_id')
        try:
            subscription = Subscription.objects.get(id=subscription_id)
        except Subscription.DoesNotExist:
            return JsonResponse({'error': 'Subscription not found'}, status=404)
        subscription.end_date = datetime.today().date()
        subscription.save()
        return JsonResponse({'message': 'Subscription ended successfully'}, status=200)
    return JsonResponse({'error': 'Invalid HTTP method. Use POST.'}, status=405)

def revenue_report(request):
    if request.method == "GET":
        subscriptions = Subscription.objects.all()
        total_revenue = sum(sub.users * sub.product.annual_cost for sub in subscriptions)

        return JsonResponse({'total_revenue': total_revenue}, status=200)