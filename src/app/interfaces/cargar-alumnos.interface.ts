import { Alumno  } from "../models/alumno.model";

export interface CargarAlumno {
    total: number;
    alumnos: Alumno[];
}