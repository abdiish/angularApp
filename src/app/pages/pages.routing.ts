import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';

const routes: Routes = [

    { 
        path: 'dashboard', component: PagesComponent,
        children: [
            // Rutas protegidas/rutas hijas 
            { path: '', component: DashboardComponent },
            { path: 'asistencia', component: AsistenciaComponent },

        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
