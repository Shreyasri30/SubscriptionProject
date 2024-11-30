from django.db import models
from django.core.validators import RegexValidator


class Customer(models.Model):
    customer_id = models.CharField(
        max_length=50, 
        unique=True, 
        blank=False, 
        null=False
    )
    name = models.CharField(
        max_length=100, 
        unique=True, 
        validators=[
            RegexValidator(
                regex='^[a-zA-Z0-9]*$',
                message='Customer Name must be alphanumeric and cannot contain special characters.',
                code='invalid_customer_name'
            )
        ],
        blank=False,  
        null=False    
    )
    pan = models.CharField(
    max_length=10, 
    unique=True, 
    blank=False, 
    null=False, 
    default="DEFAULT_PAN"  
    )

    def __str__(self):
        return self.name

class Product(models.Model):
    product_name = models.CharField(
        max_length=100, 
        unique=True, 
        validators=[
            RegexValidator(
                regex='^[a-zA-Z0-9]*$',
                message='Product Name must be alphanumeric and cannot contain special characters.',
                code='invalid_product_name'
            )
        ],
        blank=False,  
        null=False    
    )
    description = models.TextField()
    annual_cost = models.FloatField()
    
    def __str__(self):
        return self.product_name

class Subscription(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    users = models.PositiveIntegerField()
