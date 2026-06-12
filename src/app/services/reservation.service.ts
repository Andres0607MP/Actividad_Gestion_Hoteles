import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface Reservation {
  id: string;
  roomId: string;
  hotelId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations$ = new BehaviorSubject<Reservation[]>([
    {
      id: '1',
      roomId: '1',
      hotelId: '1',
      guestName: 'Carlos López',
      guestEmail: 'carlos@example.com',
      checkInDate: new Date('2026-06-15'),
      checkOutDate: new Date('2026-06-18'),
      status: 'confirmed',
      totalPrice: 180,
      createdAt: new Date('2026-06-10')
    },
    {
      id: '2',
      roomId: '2',
      hotelId: '1',
      guestName: 'María García',
      guestEmail: 'maria@example.com',
      checkInDate: new Date('2026-06-20'),
      checkOutDate: new Date('2026-06-25'),
      status: 'confirmed',
      totalPrice: 450,
      createdAt: new Date('2026-06-09')
    },
    {
      id: '3',
      roomId: '3',
      hotelId: '1',
      guestName: 'Juan Rodríguez',
      guestEmail: 'juan@example.com',
      checkInDate: new Date('2026-06-12'),
      checkOutDate: new Date('2026-06-14'),
      status: 'pending',
      totalPrice: 300,
      createdAt: new Date('2026-06-10')
    },
    {
      id: '4',
      roomId: '4',
      hotelId: '2',
      guestName: 'Ana Martínez',
      guestEmail: 'ana@example.com',
      checkInDate: new Date('2026-07-01'),
      checkOutDate: new Date('2026-07-08'),
      status: 'confirmed',
      totalPrice: 840,
      createdAt: new Date('2026-06-08')
    }
  ]);

  constructor() {}

  getReservations(): Observable<Reservation[]> {
    return this.reservations$.asObservable();
  }

  searchReservations(query: string): Observable<Reservation[]> {
    return this.reservations$.pipe(
      map(reservations =>
        reservations.filter(r =>
          r.guestName.toLowerCase().includes(query.toLowerCase()) ||
          r.guestEmail.toLowerCase().includes(query.toLowerCase()) ||
          r.id.includes(query)
        )
      ),
      delay(300)
    );
  }

  getReservationsByStatus(status: string): Observable<Reservation[]> {
    return this.reservations$.pipe(
      map(reservations => reservations.filter(r => r.status === status))
    );
  }

  getReservationById(id: string): Observable<Reservation | undefined> {
    return this.reservations$.pipe(
      map(reservations => reservations.find(r => r.id === id))
    );
  }

  addReservation(reservation: Omit<Reservation, 'id' | 'createdAt'>): Observable<Reservation> {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const currentReservations = this.reservations$.value;
    this.reservations$.next([...currentReservations, newReservation]);

    return of(newReservation).pipe(delay(500));
  }

  updateReservation(id: string, updates: Partial<Reservation>): Observable<Reservation> {
    const currentReservations = this.reservations$.value;
    const reservationIndex = currentReservations.findIndex(r => r.id === id);

    if (reservationIndex === -1) {
      return throwError(() => new Error('Reserva no encontrada'));
    }

    const updatedReservation = { ...currentReservations[reservationIndex], ...updates };
    const newReservations = [...currentReservations];
    newReservations[reservationIndex] = updatedReservation;

    this.reservations$.next(newReservations);
    return of(updatedReservation).pipe(delay(500));
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.updateReservation(id, { status: 'cancelled' });
  }

  deleteReservation(id: string): Observable<void> {
    const currentReservations = this.reservations$.value;
    const filteredReservations = currentReservations.filter(r => r.id !== id);

    this.reservations$.next(filteredReservations);
    return of(void 0).pipe(delay(500));
  }
}
