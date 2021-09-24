import { environment } from '../../environments/environment'; 

const base_url =  environment.base_url;

export class Profesor {

    constructor(
        public nombre: string,
        public fechaIngreso: string,
        public telefono: string,
        public email: string,
        public img?: string,
        public status?: boolean,
        public _id?: string

    ){}

    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/upload/profesores/no-image`; 
        } else if (this.img.includes('https')) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/profesores/${ this.img }`;
        } else {
            return `${ base_url }/upload/profesores/no-image`;
        } 

    }
}