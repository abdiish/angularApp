import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno.model';
import { empty, Subscription } from 'rxjs';
import { AlumnosService } from '../../../services/alumno.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: [
  ]
})
export class AlumnosComponent implements OnInit, OnDestroy {

  public totalAlumnos: number = 0;
  public alumnos: Alumno[] = [];
  public alumnosTemp: Alumno[] = [];

  public imgSubs: Subscription;

  public desde: number = 0;
  public cargando: boolean = true;

  public msg: boolean;
  public imgEmpty: boolean;

  constructor(private alumnosService: AlumnosService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    // Cargar lista de registros: Alumnos
    this.cargarAlumnos();

    // Modal imagen, Mantenimientos
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(400)
      )
      .subscribe( img => { 
        this.cargarAlumnos(); 
    });

  }

  cargarAlumnos() {

    this.cargando = true;
    this.alumnosService.cargarAlumnos(this.desde)
      .subscribe(({total, alumnos}) => {
        
        if (total === 0) { this.imgEmpty = true; }
          this.totalAlumnos = total;
          this.alumnos = alumnos;
          this.alumnosTemp = alumnos;
          this.cargando = false;
      })
  }

  borrarAlumno(alumno: Alumno) {
    
    Swal.fire({
      title: '¿Borrar alumno?',
      text: `Esta a punto de borrar a:  ${ alumno.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result) => {
      if (result.value) {
       this.alumnosService.borrarAlumno( alumno._id )
          .subscribe( resp => {
            this.cargarAlumnos();
            Swal.fire(
              'Alumno borrado',
              `${ alumno.nombre } fue eliminado correctamente`,
              'success' 
            ); 
          });
        }       
      })
    
  }

  buscar(termino: string) {

    this.msg = false;

    if (termino.length === 0) {
      return this.alumnos = this.alumnosTemp;
    }

    this.busquedasService.buscar('alumnos', termino)
      .subscribe((resp: Alumno[]) => {

        if (resp.length === 0) {
          //this.msg = true;
          Swal.fire({
            title: 'No se encontrarón resultados para su búsqueda',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.cargarAlumnos();
            }
          })
        }

        this.alumnos = resp;

      });

  }

  abrirModal(alumno: Alumno) {
  
    this.modalImagenService.abrirModal('alumnos', alumno._id, alumno.img);
  }

  cambiarPagina(valor: number) {
    
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalAlumnos) {
      this.desde -= valor;
    }
    this.cargarAlumnos();
  }

}
