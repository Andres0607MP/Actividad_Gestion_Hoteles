import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Reservation } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // TODO: Firebase - Reemplazar BehaviorSubject con llamadas a Firestore
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
      roomId: '4',
      hotelId: '2',
      guestName: 'Juan Martínez',
      guestEmail: 'juan@example.com',
      checkInDate: new Date('2026-07-01'),
      checkOutDate: new Date('2026-07-05'),
      status: 'pending',
      totalPrice: 800,
      createdAt: new Date('2026-06-11')
    },
    {
      id: '4',
      roomId: '2',
      hotelId: '1',
      guestName: 'Ana Rodríguez',
      guestEmail: 'ana@example.com',
      checkInDate: new Date('2026-06-30'),
      checkOutDate: new Date('2026-07-10'),
      status: 'cancelled',
      totalPrice: 900,
      createdAt: new Date('2026-06-08')
    }
  ]);

  constructor() {}

  getReservations(): Observable<Reservation[]> {
    return this.reservations$.asObservable().pipe(delay(300));
  }

  getReservationById(id: string): Observable<Reservation | undefined> {
    return this.reservations$.pipe(
      map(reservations => reservations.find(r => r.id === id)),
      delay(300)
    );
  }

  getReservationsByStatus(status: string): Observable<Reservation[]> {
    return this.reservations$.pipe(
      map(reservations => reservations.filter(r => r.status === status)),
      delay(300)
    );
  }

  searchReservations(query: string): Observable<Reservation[]> {
    return this.reservations$.pipe(
      map(reservations =>
        reservations.filter(
          r =>
            r.guestName.toLowerCase().includes(query.toLowerCase()) ||
            r.guestEmail.toLowerCase().includes(query.toLowerCase())
        )
      ),
      delay(300)
    );
  }

  addReservation(reservation: Omit<Reservation, 'id' | 'createdAt'>): Observable<Reservation> {
    const newReservation: Reservation = {
      ...reservation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };

    const currentReservations = this.reservations$.value;
    this.reservations$.next([...currentReservations, newReservation]);

    // TODO: Firebase - Guardar en Firestore
    return of(newReservation).pipe(delay(500));
  }

  updateReservation(id: string, updates: Partial<Reservation>): Observable<Reservation> {
    const currentReservations = this.reservations$.value;
    const index = currentReservations.findIndex(r => r.id === id);

    if (index === -1) {
      throw new Error('Reserva no encontrada');
    }

    const updatedReservation = { ...currentReservations[index], ...updates };
    const newReservations = [
      ...currentReservations.slice(0, index),
      updatedReservation,
      ...currentReservations.slice(index + 1)
    ];

    this.reservations$.next(newReservations);

    // TODO: Firebase - Actualizar en Firestore
    return of(updatedReservation).pipe(delay(500));
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.updateReservation(id, { status: 'cancelled' });
  }

  deleteReservation(id: string): Observable<void> {
    const currentReservations = this.reservations$.value;
    this.reservations$.next(currentReservations.filter(r => r.id !== id));

    // TODO: Firebase - Eliminar de Firestore
    return of(void 0).pipe(delay(500));
  }
}
