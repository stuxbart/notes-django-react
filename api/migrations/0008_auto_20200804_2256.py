# Generated by Django 3.0.8 on 2020-08-04 20:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200803_1516'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ['-created']},
        ),
        migrations.RemoveField(
            model_name='note',
            name='groups',
        ),
        migrations.DeleteModel(
            name='Group',
        ),
    ]
