import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalImagenComponent
  ],
  exports:[
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
