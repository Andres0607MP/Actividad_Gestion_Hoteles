import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  rooms: number;
  rating: number;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
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
      rating: 4.5,
      phone: '+34 983 45 67 89',
      email: 'info@mountainview.es',
      address: 'Avenida Sierra 789, Valladolid',
      createdAt: new Date('2024-03-10')
    }
  ]);

  constructor() {}

  getHotels(): Observable<Hotel[]> {
    return this.hotels$.asObservable();
  }

  searchHotels(query: string): Observable<Hotel[]> {
    return this.hotels$.pipe(
      map(hotels =>
        hotels.filter(h =>
          h.name.toLowerCase().includes(query.toLowerCase()) ||
          h.city.toLowerCase().includes(query.toLowerCase()) ||
          h.country.toLowerCase().includes(query.toLowerCase())
        )
      ),
      delay(300)
    );
  }

  getHotelById(id: string): Observable<Hotel | undefined> {
    return this.hotels$.pipe(
      map(hotels => hotels.find(h => h.id === id))
    );
  }

  addHotel(hotel: Omit<Hotel, 'id' | 'createdAt'>): Observable<Hotel> {
    const newHotel: Hotel = {
      ...hotel,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const currentHotels = this.hotels$.value;
    this.hotels$.next([...currentHotels, newHotel]);

    return of(newHotel).pipe(delay(500));
  }

  updateHotel(id: string, updates: Partial<Hotel>): Observable<Hotel> {
    const currentHotels = this.hotels$.value;
    const hotelIndex = currentHotels.findIndex(h => h.id === id);

    if (hotelIndex === -1) {
      return throwError(() => new Error('Hotel no encontrado'));
    }

    const updatedHotel = { ...currentHotels[hotelIndex], ...updates };
    const newHotels = [...currentHotels];
    newHotels[hotelIndex] = updatedHotel;

    this.hotels$.next(newHotels);
    return of(updatedHotel).pipe(delay(500));
  }

  deleteHotel(id: string): Observable<void> {
    const currentHotels = this.hotels$.value;
    const filteredHotels = currentHotels.filter(h => h.id !== id);

    this.hotels$.next(filteredHotels);
    return of(void 0).pipe(delay(500));
  }
}
