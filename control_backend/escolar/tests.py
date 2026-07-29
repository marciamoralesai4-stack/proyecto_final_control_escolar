from django.test import TestCase
from .models import Alumno, Materia, Calificacion

class ModeloTests(TestCase):

    def setUp(self):
        self.alumno = Alumno.objects.create(nombre="Ana", edad=17, grupo="601")
        self.materia = Materia.objects.create(nombre="Programación", profesor="Ing. López")

    def test_crear_alumno(self):
        self.assertEqual(self.alumno.nombre, "Ana")

    def test_relacion_calificacion(self):
        calif = Calificacion.objects.create(alumno=self.alumno, materia=self.materia, calificacion=9.5)
        self.assertEqual(calif.alumno.nombre, "Ana")
        self.assertEqual(calif.calificacion, 9.5)

    def test_calificacion_invalida(self):
        with self.assertRaises(Exception):
            Calificacion.objects.create(alumno=None, materia=self.materia, calificacion=8)
