import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'nav-icon fas fa-school',
      submenu: [
        { titulo: 'Principal', url:'/' },
        { titulo: 'Asistencia', url:'asistencia' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'nav-icon fas fa-cogs',
      submenu: [
        { titulo: 'Usuarios', url:'usuarios' },
        { titulo: 'Alumnos', url:'alumnos' },
        { titulo: 'Profesores', url:'profesores' },
        //{ titulo: 'Asignaturas-Grupos', url:'asignaturas' },
      ]
    }
  ];

  constructor() { }
}
