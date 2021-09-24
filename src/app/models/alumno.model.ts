import { environment } from '../../environments/environment'; 

const base_url =  environment.base_url;

export class Alumno {

    constructor(
        public nombre: string,
        public fechaNacimiento: string,
        public curp: string,
        public grupo: string,
        public grado: string,
        public genero: string,
        public status?: boolean,
        public img?: string,
        public _id?: string ,
    ) {}

    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/upload/alumnos/no-image`; 
        } else if (this.img.includes('https')) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/alumnos/${ this.img }`;
        } else {
            return `${ base_url }/upload/alumnos/no-image`;
        } 

    }
}