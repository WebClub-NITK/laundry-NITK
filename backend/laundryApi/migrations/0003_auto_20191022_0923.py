# Generated by Django 2.2.6 on 2019-10-22 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laundryApi', '0002_auto_20191022_0908'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerdetails',
            name='blockNo',
            field=models.CharField(max_length=10),
        ),
    ]
