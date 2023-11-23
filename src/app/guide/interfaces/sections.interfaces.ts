export interface Seccion {
  id?: string;
  titulo: string;
  titulo2?: string;
  subtitulo: string;
  panel?: string;
  seccion: string;
  ingreso?: Content[];
  contenido?: Content[];
}

export interface Content {
  id?: number;
  subtitles: string;
  imagesUrl: string;
  publicIdImage?: string;
}

/* Calendary */

export type Calendary = 'asistencias' | 'valores' | 'reportes';

export interface CalendaryObject {
  labelName: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
}
