import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../models/profesor.model';
import { CargarProfesor } from '../interfaces/cargar-profesores.interface';
import { map } from 'rxjs/operators';
import { RegisterProfesor } from '../interfaces/register-profesor.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  
  public profesor: Profesor

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

  cargarProfesores(desde:number = 0){

    const url = `${ base_url }/profesores?desde=${ desde }`;
    return this.http.get<CargarProfesor>(url, this.headers)
      .pipe(
        map(resp => {
          const profesores = resp.profesores.map(
            professor => new Profesor(
              professor.nombre,
              professor.fechaIngreso,
              professor.telefono,
              professor.email,
              professor.img,
              professor.status,
              professor._id));
          return {
            total: resp.total,
            profesores
          }
        })
      )
  }

  crearProfesor(formData: RegisterProfesor) {
    const url = `${ base_url }/profesores`;
    return this.http.post(url, formData, this.headers);
  }

  borrarProfesor(_id: string) {
    const url = `${ base_url }/profesores/${_id}`;
    return this.http.delete(url, this.headers);
  }

  obtenerProfesorPorId(_id: string) {
    const url = `${ base_url }/profesores/${ _id }`;
    return this.http.get(url, this.headers)
            .pipe(
              map((resp: {ok: boolean, profesor: Profesor}) => resp.profesor)
            );
  }

  actualizarProfesor(profesor: Profesor) {
    const url = `${ base_url }/profesores/${ profesor._id }`;
    return this.http.put(url, profesor, this.headers);
  }


}
