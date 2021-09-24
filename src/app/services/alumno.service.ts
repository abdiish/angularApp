import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CargarAlumno } from '../interfaces/cargar-alumnos.interface';
import { map } from 'rxjs/operators';
import { Alumno } from '../models/alumno.model';
import { RegisterAlumno } from '../interfaces/register-alumno.interface';
import { tap } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  public alumno     : Alumno;
  private _grupos   : string[] = ['A','B','C','D','E','F'];
  private _grados   : string[] = ['Primero','Segundo','Tercero','Cuarto','Quinto','Sexto'];

  constructor(private http: HttpClient) { }

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

  get grupos(): string[] { return [...this._grupos]; }

  get grados(): string[] { return [...this._grados]; }


  cargarAlumnos(desde:number = 0) {

    const url = `${ base_url }/alumnos?desde=${ desde }`;
    return this.http.get<CargarAlumno>(url, this.headers)
      .pipe(
        map( resp => {
          const alumnos = resp.alumnos.map(
            student => new Alumno(
              student.nombre,
              student.fechaNacimiento,
              student.curp, 
              student.grupo,
              student.grado,
              student.genero,
              student.status,
              student.img,
              student._id));
          return {
            total: resp.total,
            alumnos
          }
        })
      )
  }

  crearAlumno(formData: RegisterAlumno) {
    const url = `${ base_url }/alumnos`;
    return this.http.post( url, formData, this.headers );      
  }

  borrarAlumno(_id: string) {
    const url = `${ base_url }/alumnos/${_id}`;
    return this.http.delete( url, this.headers );
  }

  obtenerAlumnoPorId(_id: string) {

    const url = `${ base_url }/alumnos/${ _id }`;
    return this.http.get( url, this.headers )
            .pipe(
              map( (resp: {ok: boolean, alumno: Alumno}) => resp.alumno )
            ); 
  }

  actualizarAlumno(alumno: Alumno) {

    const url = `${ base_url }/alumnos/${ alumno._id }`;
    return this.http.put(url, alumno, this.headers);
  }

}
