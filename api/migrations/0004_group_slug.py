# Generated by Django 3.0.8 on 2020-07-29 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200729_1242'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='slug',
            field=models.SlugField(default='group-1'),
            preserve_default=False,
        ),
    ]