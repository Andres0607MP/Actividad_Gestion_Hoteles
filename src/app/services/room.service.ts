import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  capacity: number;
  price: number;
  available: boolean;
  amenities: string[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
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
      capacity: 3,
      price: 120,
      available: true,
      amenities: ['WiFi', 'TV', 'Vista al mar', 'Minibar'],
      createdAt: new Date('2024-02-20')
    }
  ]);

  constructor() {}

  getRooms(): Observable<Room[]> {
    return this.rooms$.asObservable();
  }

  getRoomsByHotel(hotelId: string): Observable<Room[]> {
    return this.rooms$.pipe(
      map(rooms => rooms.filter(r => r.hotelId === hotelId)),
      delay(300)
    );
  }

  getAvailableRooms(): Observable<Room[]> {
    return this.rooms$.pipe(
      map(rooms => rooms.filter(r => r.available))
    );
  }

  getRoomById(id: string): Observable<Room | undefined> {
    return this.rooms$.pipe(
      map(rooms => rooms.find(r => r.id === id))
    );
  }

  addRoom(room: Omit<Room, 'id' | 'createdAt'>): Observable<Room> {
    const newRoom: Room = {
      ...room,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const currentRooms = this.rooms$.value;
    this.rooms$.next([...currentRooms, newRoom]);

    return of(newRoom).pipe(delay(500));
  }

  updateRoom(id: string, updates: Partial<Room>): Observable<Room> {
    const currentRooms = this.rooms$.value;
    const roomIndex = currentRooms.findIndex(r => r.id === id);

    if (roomIndex === -1) {
      return throwError(() => new Error('Habitación no encontrada'));
    }

    const updatedRoom = { ...currentRooms[roomIndex], ...updates };
    const newRooms = [...currentRooms];
    newRooms[roomIndex] = updatedRoom;

    this.rooms$.next(newRooms);
    return of(updatedRoom).pipe(delay(500));
  }

  deleteRoom(id: string): Observable<void> {
    const currentRooms = this.rooms$.value;
    const filteredRooms = currentRooms.filter(r => r.id !== id);

    this.rooms$.next(filteredRooms);
    return of(void 0).pipe(delay(500));
  }
}
