from django.db import models

class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    grupo = models.CharField(max_length=10)

    def __str__(self):
        return self.nombre

class Materia(models.Model):
    nombre = models.CharField(max_length=100)
    profesor = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Calificacion(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    calificacion = models.FloatField()

    def __str__(self):
        return f"{self.alumno} - {self.materia}: {self.calificacion}"