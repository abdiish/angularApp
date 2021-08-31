import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AlumnosComponent } from './mantenimientos/alumnos/alumnos.component';
import { ProfesoresComponent } from './mantenimientos/profesores/profesores.component';

const routes: Routes = [

    { 
        path: 'dashboard', component: PagesComponent,
        children: [
            // Rutas protegidas/rutas hijas 
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'asistencia', component: AsistenciaComponent, data: { titulo: 'Asistencia de Alumnos'} },

            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de la aplicación'} },
            { path: 'alumnos', component: AlumnosComponent, data: { titulo: 'Alumnos'} },
            { path: 'profesores', component: ProfesoresComponent, data: { titulo: 'Profesores'} },
            { path: 'modal-imagen', component: ProfesoresComponent, data: { titulo: 'Modal'} },
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
