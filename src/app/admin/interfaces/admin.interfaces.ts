export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  pais: string;
  ciudad: string;
  roles: string;
  imagesUrl: string;
  password: string;
  isActive: boolean;
  token: string /* solo para response */;
}
