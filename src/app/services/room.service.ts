import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Room } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private mockRooms: Room[] = [
    {
      id: '1',
      hotelId: '1',
      roomNumber: '101',
      type: 'single',
      capacity: 1,
      price: 80,
      available: true,
      amenities: ['WiFi', 'TV', 'Aire Acondicionado']
    },
    {
      id: '2',
      hotelId: '1',
      roomNumber: '102',
      type: 'double',
      capacity: 2,
      price: 120,
      available: false,
      amenities: ['WiFi', 'TV', 'Aire Acondicionado', 'Jacuzzi']
    },
    {
      id: '3',
      hotelId: '2',
      roomNumber: '201',
      type: 'suite',
      capacity: 4,
      price: 250,
      available: true,
      amenities: ['WiFi', 'TV', 'Sala de Estar', 'Balcón']
    },
    {
      id: '4',
      hotelId: '3',
      roomNumber: '301',
      type: 'deluxe',
      capacity: 2,
      price: 200,
      available: true,
      amenities: ['WiFi', 'TV', 'Chimenea', 'Vistas a Montañas']
    }
  ];

  private roomsSubject = new BehaviorSubject<Room[]>(this.mockRooms);
  rooms$ = this.roomsSubject.asObservable();

  constructor() {}

  getRooms(): Observable<Room[]> {
    return this.roomsSubject.asObservable().pipe(delay(400));
  }

  getRoomsByHotel(hotelId: string): Observable<Room[]> {
    return of(this.mockRooms.filter(r => r.hotelId === hotelId)).pipe(delay(300));
  }

  getAvailableRooms(): Observable<Room[]> {
    return of(this.mockRooms.filter(r => r.available)).pipe(delay(300));
  }

  addRoom(room: any): Observable<Room> {
    const newRoom: Room = {
      ...room,
      id: Date.now().toString()
    };
    this.mockRooms.push(newRoom);
    this.roomsSubject.next([...this.mockRooms]);
    // TODO: Firebase - Guardar nueva habitación en Firestore
    return of(newRoom).pipe(delay(400));
  }

  updateRoom(id: string, room: any): Observable<Room> {
    const index = this.mockRooms.findIndex(r => r.id === id);
    if (index > -1) {
      const updated = { ...this.mockRooms[index], ...room };
      this.mockRooms[index] = updated;
      this.roomsSubject.next([...this.mockRooms]);
      // TODO: Firebase - Actualizar habitación en Firestore
      return of(updated).pipe(delay(400));
    }
    return of(room).pipe(delay(400));
  }

  deleteRoom(id: string): Observable<void> {
    this.mockRooms = this.mockRooms.filter(r => r.id !== id);
    this.roomsSubject.next([...this.mockRooms]);
    // TODO: Firebase - Eliminar habitación de Firestore
    return of(void 0).pipe(delay(300));
  }

  searchRooms(query: string): Observable<Room[]> {
    const filtered = this.mockRooms.filter(r =>
      r.roomNumber.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}
