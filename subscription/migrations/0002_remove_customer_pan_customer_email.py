# Generated by Django 5.1.3 on 2024-11-29 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='pan',
        ),
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.EmailField(default='unknown@example.com', max_length=254),
        ),
    ]
