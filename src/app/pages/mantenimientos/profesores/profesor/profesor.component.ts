import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../../models/profesor.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from '../../../../services/profesor.service';
import { ValidatorService } from '../../../../shared/validator/validator.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styles: [
  ]
})
export class ProfesorComponent implements OnInit {


  public profesorSeleccionado: Profesor;

  public profesorForm = this.fb.group({
    nombre      : ['', [ Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    fechaIngreso: ['', Validators.required],
    telefono    : ['', Validators.required],
    email       : ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private profesorService: ProfesorService,
              private validatorService: ValidatorService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarProfesor(id));
  }

  campoNoValido(campo: string) {
    return this.profesorForm.get(campo)?.invalid && this.profesorForm.get(campo)?.touched;
  }

  cargarProfesor(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.profesorService.obtenerProfesorPorId(id)
      .pipe(delay(100))
      .subscribe(profesor => {
        if (!profesor) {
          return this.router.navigateByUrl(`/dashboard/profesores`);
        }
        const { nombre, fechaIngreso, telefono, email, } = profesor;
        this.profesorSeleccionado = profesor;
        this.profesorForm.setValue({ nombre, fechaIngreso, telefono, email, });
      })
  }

  crearProfesor() {

    const { nombre } = this.profesorForm.value;

    if (this.profesorSeleccionado) {
      const data = {
        ...this.profesorForm.value,
        _id: this.profesorSeleccionado._id
      }
      // Actualizar profesor
      this.profesorService.actualizarProfesor(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        })
    } else {
      const { nombre } = this.profesorForm.value;

      // Crear nuevo profesor
      this.profesorService.crearProfesor(this.profesorForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Profesor creado', `${nombre}, registrado correctamente`, 'success');
        }, (err) => {
          console.log(err)
          Swal.fire('Ocurrió un error', err.error.msg, 'error');
        });
    }

  }
}
