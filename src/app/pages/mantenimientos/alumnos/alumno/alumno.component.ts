import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnosService } from '../../../../services/alumno.service';
import { ValidatorService } from '../../../../shared/validator/validator.service';
import { delay } from 'rxjs/operators';
import { Alumno } from '../../../../models/alumno.model';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styles: [
  ]
})
export class AlumnoComponent implements OnInit{

  @ViewChild('formAlumno') formAlumno!: NgForm;

  public formSubmitted = false;
  public grupos: string[] = [];
  public grados: string[] = [];

  public alumnoSeleccionado: Alumno;

  public alumnoForm = this.fb.group({
    nombre         : ['', [ Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern) ]],
    fechaNacimiento: ['', Validators.required],
    curp           : ['', [ Validators.required, Validators.pattern(this.validatorService.curp) ]],
    grupo          : ['', Validators.required],
    grado          : ['', Validators.required],
    genero         : ['Femenino']
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private alumnoService: AlumnosService,
              private validatorService: ValidatorService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.grupos = this.alumnoService.grupos;
    this.grados = this.alumnoService.grados;

    this.activatedRoute.params
      .subscribe(({ id }) => this.cargarAlumno(id));
  }

  campoNoValido(campo: string) {
    return this.alumnoForm.get(campo)?.invalid && this.alumnoForm.get(campo)?.touched;
  }

  cargarAlumno( id: string ) {

    if (id === 'nuevo') {
        return;
    }

    this.alumnoService.obtenerAlumnoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe( alumno => {

        if (!alumno) {
          return this.router.navigateByUrl(`/dashboard/alumnos`); 
        }
        const { nombre, fechaNacimiento, curp, grupo, grado, genero } = alumno;
        this.alumnoSeleccionado = alumno;
        this.alumnoForm.setValue({ nombre, fechaNacimiento, curp, grupo, grado, genero });
      })
  }

  crearAlumno() {
    
    const { nombre } = this.alumnoForm.value;

    if (this.alumnoSeleccionado) {
      const data = {
        ...this.alumnoForm.value,
        _id: this.alumnoSeleccionado._id
      }
      // Actualizar alumno
      this.alumnoService.actualizarAlumno(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        })
    } else {
      const { nombre } = this.alumnoForm.value;

      // Crear nuevo alumno
      this.alumnoService.crearAlumno(this.alumnoForm.value)
        .subscribe((resp: any) => {
          this.formAlumno.resetForm(
            {
              grupo : "",
              grado : "",
              genero: "Femenino"
            }
          );
          Swal.fire('Alumno creado', `${nombre}, registrado correctamente`, 'success');
        }, (err) => {
          Swal.fire('Ocurrió un error', err.error.msg, 'error');
        });
    }
  
  }

}
