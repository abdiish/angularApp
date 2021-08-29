import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

    { 
        path: '', component: PagesComponent,
        children: [
            // Rutas protegidas/rutas hijas 
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo:'/dashboard', pathMatch:'full' }, // path vacio, redirecciona a dashboard
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
