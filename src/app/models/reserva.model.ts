export interface Reserva {
  id?: string;
  usuarioId: string;
  habitacionId: string;
  fechaEntrada: any;
  fechaSalida: any;
  estado: 'pending' | 'confirmed' | 'cancelled';
}