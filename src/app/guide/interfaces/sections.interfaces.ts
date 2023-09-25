export interface Seccion {
  titulo: string;
  titulo2?: string;
  subtitulo: string;
  panel?: string;
  seccion: string;
  ingreso?: Content[];
  contenido?: Content[];
}

export interface Content {
  id?:number;
  subtitles: string;
  imagesUrl: string;
  publicIdImage?: string;
}
