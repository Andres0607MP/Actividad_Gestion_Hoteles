import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Room } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  // TODO: Firebase - Reemplazar BehaviorSubject con llamadas a Firestore
  private rooms$ = new BehaviorSubject<Room[]>([
    {
      id: '1',
      hotelId: '1',
      roomNumber: '101',
      type: 'single',
      capacity: 1,
      price: 60,
      available: true,
      amenities: ['WiFi', 'TV', 'Baño privado'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      hotelId: '1',
      roomNumber: '102',
      type: 'double',
      capacity: 2,
      price: 90,
      available: true,
      amenities: ['WiFi', 'TV', 'Baño privado', 'Aire acondicionado'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '3',
      hotelId: '1',
      roomNumber: '201',
      type: 'suite',
      capacity: 4,
      price: 150,
      available: false,
      amenities: ['WiFi', 'TV', 'Jacuzzi', 'Minibar', 'Aire acondicionado'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '4',
      hotelId: '2',
      roomNumber: '301',
      type: 'deluxe',
      capacity: 2,
      price: 200,
      available: true,
      amenities: ['WiFi', 'TV', 'Vistas al mar', 'Terraza privada'],
      createdAt: new Date('2024-02-20')
    }
  ]);

  constructor() {}

  getRooms(): Observable<Room[]> {
    return this.rooms$.asObservable().pipe(delay(300));
  }

  getRoomById(id: string): Observable<Room | undefined> {
    return this.rooms$.pipe(
      map(rooms => rooms.find(r => r.id === id)),
      delay(300)
    );
  }

  getRoomsByHotel(hotelId: string): Observable<Room[]> {
    return this.rooms$.pipe(
      map(rooms => rooms.filter(r => r.hotelId === hotelId)),
      delay(300)
    );
  }

  getAvailableRooms(): Observable<Room[]> {
    return this.rooms$.pipe(
      map(rooms => rooms.filter(r => r.available)),
      delay(300)
    );
  }

  addRoom(room: Omit<Room, 'id' | 'createdAt'>): Observable<Room> {
    const newRoom: Room = {
      ...room,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    const currentRooms = this.rooms$.value;
    this.rooms$.next([...currentRooms, newRoom]);

    // TODO: Firebase - Guardar en Firestore
    return of(newRoom).pipe(delay(500));
  }

  updateRoom(id: string, updates: Partial<Room>): Observable<Room> {
    const currentRooms = this.rooms$.value;
    const index = currentRooms.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error('Habitación no encontrada');
    }

    const updatedRoom = { ...currentRooms[index], ...updates };
    const newRooms = [
      ...currentRooms.slice(0, index),
      updatedRoom,
      ...currentRooms.slice(index + 1)
    ];

    this.rooms$.next(newRooms);

    // TODO: Firebase - Actualizar en Firestore
    return of(updatedRoom).pipe(delay(500));
  }

  deleteRoom(id: string): Observable<void> {
    const currentRooms = this.rooms$.value;
    this.rooms$.next(currentRooms.filter(r => r.id !== id));

    // TODO: Firebase - Eliminar de Firestore
    return of(void 0).pipe(delay(500));
  }
}
