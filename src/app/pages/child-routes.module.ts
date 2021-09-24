import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';


//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AlumnosComponent } from './mantenimientos/alumnos/alumnos.component';
import { ProfesoresComponent } from './mantenimientos/profesores/profesores.component';
import { AlumnoComponent } from './mantenimientos/alumnos/alumno/alumno.component';
import { ProfesorComponent } from './mantenimientos/profesores/profesor/profesor.component';
import { Routes, RouterModule } from '@angular/router';


const childRoutes: Routes = [
  
  // Rutas protegidas/rutas hijas 
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
  { path: 'asistencia', component: AsistenciaComponent, data: { titulo: 'Asistencia'} },

  //Mantenimientos
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'} },
  { path: 'alumnos', component: AlumnosComponent, data: { titulo: 'Alumnos'} },
  { path: 'profesores', component: ProfesoresComponent, data: { titulo: 'Profesores'} },
  { path: 'modal-imagen', component: ProfesoresComponent, data: { titulo: 'Modal'} },
  { path: 'alumno/:id', component: AlumnoComponent, data: { titulo: 'Actualizar Alumno'} },
  { path: 'profesor/:id', component: ProfesorComponent, data: { titulo: 'Actualizar Profesor'} },

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule,
  ]
})
export class ChildRoutesModule { }
