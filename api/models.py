from django.db import models
from django.db.models.signals import pre_save
from django.shortcuts import reverse
from django.contrib.auth.models import User

from .utils import random_slug_generator


COLORS = (
    ('primary',   'Blue'),
    ('secondary', 'Grey'),
    ('success',   'Green'),
    ('danger',    'Red'),
    ('warning',   'Yellow'),
    ('info',      'Cyan'),
    ('light',     'Lightgrey'),
    ('dark',      'Black')
)


class Note(models.Model):
    title       = models.CharField(max_length=100, null=True, blank=True)
    body        = models.TextField()
    slug        = models.SlugField(null=True, blank=True)
    created     = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)
    important   = models.BooleanField(default=False)
    done        = models.BooleanField(default=False)
    color       = models.CharField(max_length=100, choices=COLORS, blank=True, null=True)
    owner       = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="notes")

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("notes:details", kwargs={"slug": self.slug})
    

def note_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = random_slug_generator(instance)


pre_save.connect(note_pre_save_receiver, sender=Note)
