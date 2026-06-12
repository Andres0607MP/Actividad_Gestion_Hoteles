import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Hotel } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  // TODO: Firebase - Reemplazar BehaviorSubject con llamadas a Firestore
  private hotels$ = new BehaviorSubject<Hotel[]>([
    {
      id: '1',
      name: 'Hotel Plaza Premium',
      city: 'Madrid',
      country: 'España',
      rooms: 120,
      rating: 4.8,
      phone: '+34 912 34 56 78',
      email: 'info@hotelplaza.es',
      address: 'Calle Principal 123, Madrid',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Hotel Costa Azul',
      city: 'Barcelona',
      country: 'España',
      rooms: 85,
      rating: 4.6,
      phone: '+34 933 45 67 89',
      email: 'info@costaazul.es',
      address: 'Paseo Marítimo 456, Barcelona',
      createdAt: new Date('2024-02-20')
    },
    {
      id: '3',
      name: 'Hotel Mountain View',
      city: 'Valladolid',
      country: 'España',
      rooms: 60,
      rating: 4.4,
      phone: '+34 983 21 43 65',
      email: 'info@mountainview.es',
      address: 'Sierra Nevada 789, Valladolid',
      createdAt: new Date('2024-03-10')
    }
  ]);

  constructor() {}

  getHotels(): Observable<Hotel[]> {
    return this.hotels$.asObservable().pipe(delay(300));
  }

  getHotelById(id: string): Observable<Hotel | undefined> {
    return this.hotels$.pipe(
      map(hotels => hotels.find(h => h.id === id)),
      delay(300)
    );
  }

  searchHotels(query: string): Observable<Hotel[]> {
    return this.hotels$.pipe(
      map(hotels =>
        hotels.filter(
          h =>
            h.name.toLowerCase().includes(query.toLowerCase()) ||
            h.city.toLowerCase().includes(query.toLowerCase()) ||
            h.country.toLowerCase().includes(query.toLowerCase())
        )
      ),
      delay(300)
    );
  }

  addHotel(hotel: Omit<Hotel, 'id' | 'createdAt'>): Observable<Hotel> {
    const newHotel: Hotel = {
      ...hotel,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    const currentHotels = this.hotels$.value;
    this.hotels$.next([...currentHotels, newHotel]);

    // TODO: Firebase - Guardar en Firestore
    return of(newHotel).pipe(delay(500));
  }

  updateHotel(id: string, updates: Partial<Hotel>): Observable<Hotel> {
    const currentHotels = this.hotels$.value;
    const index = currentHotels.findIndex(h => h.id === id);

    if (index === -1) {
      throw new Error('Hotel no encontrado');
    }

    const updatedHotel = { ...currentHotels[index], ...updates };
    const newHotels = [
      ...currentHotels.slice(0, index),
      updatedHotel,
      ...currentHotels.slice(index + 1)
    ];

    this.hotels$.next(newHotels);

    // TODO: Firebase - Actualizar en Firestore
    return of(updatedHotel).pipe(delay(500));
  }

  deleteHotel(id: string): Observable<void> {
    const currentHotels = this.hotels$.value;
    this.hotels$.next(currentHotels.filter(h => h.id !== id));

    // TODO: Firebase - Eliminar de Firestore
    return of(void 0).pipe(delay(500));
  }
}
