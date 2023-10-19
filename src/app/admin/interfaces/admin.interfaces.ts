export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  pais: string;
  ciudad: string;
  roles: string;
  imagenUrl: string;
  password: string;
  isActive: boolean;
  token: string /* solo para response */;
}
