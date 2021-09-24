import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Alumno } from '../models/alumno.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }
  
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.status, user.role, user.uid)
    );
  }
  
  private transformarAlumnos( resultados: any[]): Alumno[] {
    return resultados.map(
      alumno => new Alumno(alumno.nombre, alumno.fechaNacimiento, alumno.curp, alumno.grupo, alumno.grado, alumno.genero, alumno.status, alumno.img)
    );
  }
  
  
  // private transformarProfesores( resultados: any[]): Profesor[] {
  //   return resultados;
  // }

  buscar(
    tipo: 'usuarios'|'alumnos'|'profesores',
    termino: string
  ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
        .pipe(
          map( (resp: any) => {

            switch ( tipo ) {
              case 'usuarios':
                return this.transformarUsuarios(resp.resultados)
              case 'alumnos':
                return this.transformarAlumnos(resp.resultados)
              case 'alumnos':
                return 'profesores'
              default:
                return[];
            }
          })
        );
  }

}
