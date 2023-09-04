export interface Direccion {
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

export interface UbicacionActual {
  latitud: number;
  longitud: number;
  timestamp: Date | string;
}

export interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  calificacion: number;
  insignias: string[];
  librosIntercambiados: string[]; // Estos son IDs de los libros
  direccion: Direccion;
  ubicacionActual: UbicacionActual;
}
