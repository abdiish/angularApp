import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  
  public desde: number = 0;
  public cargando: boolean = true;
  
  public msg: boolean;

  constructor(private usuarioService: UsuarioService,
              private busquedasServices: BusquedasService,
              public modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();//Evitar fugas de memoria
  }

  ngOnInit(): void {

    this.cargarUsuarios();
    // Modal imagen, Mantenimientos
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => { 
        this.cargarUsuarios(); 
    });

  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar( termino: string ) {
    
    this.msg = false;
    
    if (termino.length === 0) {
        return this.usuarios = this.usuariosTemp;
    }
    
    this.busquedasServices.buscar('usuarios', termino)
      .subscribe((resp: Usuario[]) => {

        if (resp.length === 0) {
          this.msg = true;
        }

        this.usuarios = resp;

      });

  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
        return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    
    Swal.fire({
      title: '¿Eliminar cuenta?',
      text: `Se eliminará la cuenta de:  ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) { // Sí es true entonces
       this.usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Se eliminó la cuenta',
              `${ usuario.nombre }`,
              'success' 
            ); 
          });
        }       
      })
  }

  cambiarRole( usuario: Usuario ) {
    
    this.usuarioService.guardarUsuario( usuario )
      .subscribe( resp => {

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: ` Se actualizo el rol del usuario ${ usuario.nombre }`
        })
      });
    
  }

  abrirModal(usuario: Usuario) {
  
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
