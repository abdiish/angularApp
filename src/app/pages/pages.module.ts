import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AlumnosComponent } from './mantenimientos/alumnos/alumnos.component';
import { ProfesoresComponent } from './mantenimientos/profesores/profesores.component';
import { AlumnoComponent } from './mantenimientos/alumnos/alumno/alumno.component';
import { ProfesorComponent } from './mantenimientos/profesores/profesor/profesor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AsistenciaComponent,
    UsuariosComponent,
    AlumnosComponent,
    ProfesoresComponent,
    AlumnoComponent,
    ProfesorComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
