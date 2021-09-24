import { Profesor } from '../models/profesor.model';

export interface CargarProfesor {
    total: number;
    profesores: Profesor[];
}