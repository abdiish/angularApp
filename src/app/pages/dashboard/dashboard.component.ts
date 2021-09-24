import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AlumnosService } from '../../services/alumno.service';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public totalUsuarios  : number = 0;
  public totalAlumnos   : number = 0;
  public totalProfesores: number = 0;

  constructor(private usuarioService: UsuarioService,
              private alumnosService: AlumnosService,
              private profesorService: ProfesorService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.cargarAlumnos();
    this.cargarProfesores();
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios( )
      .subscribe( ({ total }) => {
        this.totalUsuarios = total;
      })
  }

  cargarAlumnos() {

    this.alumnosService.cargarAlumnos()
      .subscribe(({ total }) => {
          this.totalAlumnos = total;
      })
  }

  cargarProfesores() {

    this.profesorService.cargarProfesores()
      .subscribe(({ total }) => {
        this.totalProfesores = total;
      })
  }

}
