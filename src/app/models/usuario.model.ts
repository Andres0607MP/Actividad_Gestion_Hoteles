export interface Usuario {
  id?: string;
  nombre: string;
  correo: string;
  rol: 'admin' | 'usuario';
  fechaRegistro?: any;
}