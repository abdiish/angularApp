import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfesorService } from '../../../services/profesor.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Profesor } from '../../../models/profesor.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styles: [
  ]
})
export class ProfesoresComponent implements OnInit, OnDestroy {

  public totalProfesores: number = 0;
  public desde          : number = 0;
  public profesores     : Profesor[] = [];
  public profesoresTemp : Profesor[] = [];
  public imgSubs        : Subscription;
  public cargando       : boolean = true;
  public imgEmpty       : boolean;

  constructor(private profesorService: ProfesorService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarProfesores()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(400)
      )
      .subscribe(img => {
        this.cargarProfesores();
      });
  }

  cargarProfesores() {

    this.cargando = true;
    this.profesorService.cargarProfesores(this.desde)
      .subscribe(({total, profesores}) => {

        if (total === 0) { this.imgEmpty = true; }
        this.totalProfesores = total;
        this.profesores = profesores;
        this.profesoresTemp = profesores;
        this.cargando = false;
      })
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.profesores = this.profesoresTemp;
    }

    this.busquedasService.buscar('profesores', termino)
      .subscribe((resp: Profesor[]) => {

        if (resp.length === 0) {
          Swal.fire({
            title: 'No se encontrarón resultados para su búsqueda',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.cargarProfesores();
            }
          })
        }

        this.profesores = resp;

      });
  }

  abrirModal(profesor: Profesor) {
  
    this.modalImagenService.abrirModal('profesores', profesor._id, profesor.img);
  }

  cambiarPagina(valor: number) {
    
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalProfesores) {
      this.desde -= valor;
    }
    this.cargarProfesores();
  }


}
