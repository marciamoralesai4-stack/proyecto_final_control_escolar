import { useState, useEffect } from 'react'
import './App.css'

const API = 'https://proyecto-final-control-escolar.onrender.com/api/'

function App() {
  const [alumnos, setAlumnos] = useState([])
  const [materias, setMaterias] = useState([])
  const [calificaciones, setCalificaciones] = useState([])

  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: '', edad: '', grupo: '' })
  const [nuevaMateria, setNuevaMateria] = useState({ nombre: '', profesor: '' })
  const [nuevaCalificacion, setNuevaCalificacion] = useState({ alumno: '', materia: '', calificacion: '' })

  useEffect(() => {
    cargarAlumnos()
    cargarMaterias()
    cargarCalificaciones()
  }, [])

  function cargarAlumnos() {
    fetch(`${API}/alumnos/`).then(res => res.json()).then(setAlumnos)
  }
  function cargarMaterias() {
    fetch(`${API}/materias/`).then(res => res.json()).then(setMaterias)
  }
  function cargarCalificaciones() {
    fetch(`${API}/calificaciones/`).then(res => res.json()).then(setCalificaciones)
  }

  // ---------- ALUMNOS ----------
  function agregarAlumno(e) {
    e.preventDefault()
    fetch(`${API}/alumnos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoAlumno),
    }).then(() => {
      setNuevoAlumno({ nombre: '', edad: '', grupo: '' })
      cargarAlumnos()
    })
  }

  function eliminarAlumno(id) {
    fetch(`${API}/alumnos/${id}/`, { method: 'DELETE' }).then(() => cargarAlumnos())
  }

  // ---------- MATERIAS ----------
  function agregarMateria(e) {
    e.preventDefault()
    fetch(`${API}/materias/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaMateria),
    }).then(() => {
      setNuevaMateria({ nombre: '', profesor: '' })
      cargarMaterias()
    })
  }

  function eliminarMateria(id) {
    fetch(`${API}/materias/${id}/`, { method: 'DELETE' }).then(() => cargarMaterias())
  }

  // ---------- CALIFICACIONES ----------
  function agregarCalificacion(e) {
    e.preventDefault()
    fetch(`${API}/calificaciones/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCalificacion),
    }).then(() => {
      setNuevaCalificacion({ alumno: '', materia: '', calificacion: '' })
      cargarCalificaciones()
    })
  }

  function eliminarCalificacion(id) {
    fetch(`${API}/calificaciones/${id}/`, { method: 'DELETE' }).then(() => cargarCalificaciones())
  }

  // ---------- Promedio por alumno ----------
  function promedioDeAlumno(alumnoId) {
    const propias = calificaciones.filter(c => c.alumno === alumnoId)
    if (propias.length === 0) return 'Sin calificaciones'
    const suma = propias.reduce((total, c) => total + parseFloat(c.calificacion), 0)
    return (suma / propias.length).toFixed(2)
  }

  function nombreAlumno(id) {
    const a = alumnos.find(a => a.id === id)
    return a ? a.nombre : id
  }
  function nombreMateria(id) {
    const m = materias.find(m => m.id === id)
    return m ? m.nombre : id
  }

  return (
    <div className="App">
      <h1>Sistema de Control Escolar</h1>

      <section>
        <h2>Alumnos</h2>
        <form onSubmit={agregarAlumno}>
          <input type="text" placeholder="Nombre" value={nuevoAlumno.nombre}
            onChange={e => setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })} required />
          <input type="number" placeholder="Edad" value={nuevoAlumno.edad}
            onChange={e => setNuevoAlumno({ ...nuevoAlumno, edad: e.target.value })} required />
          <input type="text" placeholder="Grupo" value={nuevoAlumno.grupo}
            onChange={e => setNuevoAlumno({ ...nuevoAlumno, grupo: e.target.value })} required />
          <button type="submit">Agregar alumno</button>
        </form>

        <table>
          <thead>
            <tr><th>Nombre</th><th>Edad</th><th>Grupo</th><th>Promedio</th><th></th></tr>
          </thead>
          <tbody>
            {alumnos.map(a => (
              <tr key={a.id}>
                <td>{a.nombre}</td>
                <td>{a.edad}</td>
                <td>{a.grupo}</td>
                <td>{promedioDeAlumno(a.id)}</td>
                <td><button onClick={() => eliminarAlumno(a.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Materias</h2>
        <form onSubmit={agregarMateria}>
          <input type="text" placeholder="Nombre de la materia" value={nuevaMateria.nombre}
            onChange={e => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })} required />
          <input type="text" placeholder="Profesor" value={nuevaMateria.profesor}
            onChange={e => setNuevaMateria({ ...nuevaMateria, profesor: e.target.value })} required />
          <button type="submit">Agregar materia</button>
        </form>

        <table>
          <thead><tr><th>Materia</th><th>Profesor</th><th></th></tr></thead>
          <tbody>
            {materias.map(m => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                <td>{m.profesor}</td>
                <td><button onClick={() => eliminarMateria(m.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Calificaciones</h2>
        <form onSubmit={agregarCalificacion}>
          <select value={nuevaCalificacion.alumno}
            onChange={e => setNuevaCalificacion({ ...nuevaCalificacion, alumno: e.target.value })} required>
            <option value="">-- Selecciona alumno --</option>
            {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>

          <select value={nuevaCalificacion.materia}
            onChange={e => setNuevaCalificacion({ ...nuevaCalificacion, materia: e.target.value })} required>
            <option value="">-- Selecciona materia --</option>
            {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>

          <input type="number" step="0.1" placeholder="Calificación" value={nuevaCalificacion.calificacion}
            onChange={e => setNuevaCalificacion({ ...nuevaCalificacion, calificacion: e.target.value })} required />
          <button type="submit">Agregar calificación</button>
        </form>

        <table>
          <thead><tr><th>Alumno</th><th>Materia</th><th>Calificación</th><th></th></tr></thead>
          <tbody>
            {calificaciones.map(c => (
              <tr key={c.id}>
                <td>{nombreAlumno(c.alumno)}</td>
                <td>{nombreMateria(c.materia)}</td>
                <td>{c.calificacion}</td>
                <td><button onClick={() => eliminarCalificacion(c.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
