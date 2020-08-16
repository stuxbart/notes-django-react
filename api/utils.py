import random
import string
from django.utils.text import slugify


def random_slug_generator(instance,new_slug=None):
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.title)
    
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        rand_str = random_string_generator(size=4)
        new_slug = f"{slug}-{rand_str}"
        return random_slug_generator(instance, new_slug)
    return slug

def random_string_generator(size):
    return ''.join(random.choice(string.ascii_lowercase+string.digits) for _ in range(size))