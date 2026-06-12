export interface Habitacion {
  id?: string;
  hotelId: string;
  numero: string;
  tipo: string;
  precio: number;
  estado: 'disponible' | 'ocupada';
}