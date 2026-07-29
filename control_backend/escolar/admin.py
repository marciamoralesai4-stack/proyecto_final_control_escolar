from django.contrib import admin
from .models import Alumno, Materia, Calificacion

admin.site.register(Alumno)
admin.site.register(Materia)
admin.site.register(Calificacion)