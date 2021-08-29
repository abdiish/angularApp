import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  { 
    path: '', component: PagesComponent,
    children: [
        // Rutas protegidas/rutas hijas 
        { path: 'dashboard', component: DashboardComponent },
        { path: '', redirectTo:'/dashboard', pathMatch:'full' }, // path vacio, redirecciona a dashboard
    ]
  },
 
  // Rutas publicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NopagefoundComponent } // Si no es ninguna de las anteriores redireccionar a 404 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
