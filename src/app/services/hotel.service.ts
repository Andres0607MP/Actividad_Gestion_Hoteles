import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Hotel } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private mockHotels: Hotel[] = [
    {
      id: '1',
      name: 'Grand Palace Hotel',
      city: 'Barcelona',
      country: 'España',
      rooms: 120,
      rating: 4.8,
      phone: '+34 93 123 4567',
      email: 'info@grandpalace.com',
      address: 'Paseo de Gracia 1234',
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Beachfront Resort',
      city: 'Benidorm',
      country: 'España',
      rooms: 85,
      rating: 4.5,
      phone: '+34 96 456 7890',
      email: 'contact@beachfront.com',
      address: 'Calle Marina 567',
      createdAt: new Date('2023-03-20')
    },
    {
      id: '3',
      name: 'Mountain Lodge',
      city: 'Andorra la Vella',
      country: 'Andorra',
      rooms: 45,
      rating: 4.7,
      phone: '+376 123 456',
      email: 'stay@mountainlodge.ad',
      address: 'Carrer de la Pau 89',
      createdAt: new Date('2023-05-10')
    }
  ];

  private hotelsSubject = new BehaviorSubject<Hotel[]>(this.mockHotels);
  hotels$ = this.hotelsSubject.asObservable();

  constructor() {}

  getHotels(): Observable<Hotel[]> {
    return this.hotelsSubject.asObservable().pipe(delay(400));
  }

  getHotelById(id: string): Observable<Hotel | undefined> {
    return of(this.mockHotels.find(h => h.id === id)).pipe(delay(300));
  }

  addHotel(hotel: any): Observable<Hotel> {
    const newHotel: Hotel = {
      ...hotel,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.mockHotels.push(newHotel);
    this.hotelsSubject.next([...this.mockHotels]);
    // TODO: Firebase - Guardar nuevo hotel en Firestore
    return of(newHotel).pipe(delay(400));
  }

  updateHotel(id: string, hotel: any): Observable<Hotel> {
    const index = this.mockHotels.findIndex(h => h.id === id);
    if (index > -1) {
      const updated = { ...this.mockHotels[index], ...hotel };
      this.mockHotels[index] = updated;
      this.hotelsSubject.next([...this.mockHotels]);
      // TODO: Firebase - Actualizar hotel en Firestore
      return of(updated).pipe(delay(400));
    }
    return of(hotel).pipe(delay(400));
  }

  deleteHotel(id: string): Observable<void> {
    this.mockHotels = this.mockHotels.filter(h => h.id !== id);
    this.hotelsSubject.next([...this.mockHotels]);
    // TODO: Firebase - Eliminar hotel de Firestore
    return of(void 0).pipe(delay(300));
  }

  searchHotels(query: string): Observable<Hotel[]> {
    const filtered = this.mockHotels.filter(h =>
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.city.toLowerCase().includes(query.toLowerCase()) ||
      h.country.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}
