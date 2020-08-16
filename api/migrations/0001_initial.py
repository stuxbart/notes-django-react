# Generated by Django 3.0.8 on 2020-07-29 10:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('color', models.CharField(choices=[('text-white bg-primary', 'Blue'), ('text-white bg-secondary', 'Grey'), ('text-white bg-success', 'Green'), ('text-white bg-danger', 'Red'), ('text-white bg-warning', 'Yellow'), ('text-white bg-info', 'Cyan'), ('bg-light', 'Lightgrey'), ('text-white bg-dark', 'Black')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('body', models.TextField()),
                ('slug', models.SlugField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('important', models.BooleanField(default=False)),
                ('color', models.CharField(blank=True, choices=[('text-white bg-primary', 'Blue'), ('text-white bg-secondary', 'Grey'), ('text-white bg-success', 'Green'), ('text-white bg-danger', 'Red'), ('text-white bg-warning', 'Yellow'), ('text-white bg-info', 'Cyan'), ('bg-light', 'Lightgrey'), ('text-white bg-dark', 'Black')], max_length=100, null=True)),
                ('groups', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Group')),
            ],
        ),
    ]