import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reservation } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private mockReservations: Reservation[] = [
    {
      id: '1',
      roomId: '1',
      hotelId: '1',
      guestName: 'Juan García',
      guestEmail: 'juan@example.com',
      checkInDate: new Date('2026-06-15'),
      checkOutDate: new Date('2026-06-20'),
      status: 'confirmed',
      totalPrice: 400,
      createdAt: new Date('2026-06-01')
    },
    {
      id: '2',
      roomId: '2',
      hotelId: '1',
      guestName: 'María López',
      guestEmail: 'maria@example.com',
      checkInDate: new Date('2026-06-18'),
      checkOutDate: new Date('2026-06-25'),
      status: 'pending',
      totalPrice: 840,
      createdAt: new Date('2026-06-02')
    },
    {
      id: '3',
      roomId: '3',
      hotelId: '2',
      guestName: 'Carlos Pérez',
      guestEmail: 'carlos@example.com',
      checkInDate: new Date('2026-06-20'),
      checkOutDate: new Date('2026-06-22'),
      status: 'confirmed',
      totalPrice: 500,
      createdAt: new Date('2026-06-03')
    },
    {
      id: '4',
      roomId: '4',
      hotelId: '3',
      guestName: 'Ana Martínez',
      guestEmail: 'ana@example.com',
      checkInDate: new Date('2026-07-01'),
      checkOutDate: new Date('2026-07-05'),
      status: 'cancelled',
      totalPrice: 800,
      createdAt: new Date('2026-06-04')
    }
  ];

  private reservationsSubject = new BehaviorSubject<Reservation[]>(this.mockReservations);
  reservations$ = this.reservationsSubject.asObservable();

  constructor() {}

  getReservations(): Observable<Reservation[]> {
    return this.reservationsSubject.asObservable().pipe(delay(400));
  }

  getReservationsByStatus(status: string): Observable<Reservation[]> {
    return of(this.mockReservations.filter(r => r.status === status)).pipe(delay(300));
  }

  addReservation(reservation: any): Observable<Reservation> {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.mockReservations.push(newReservation);
    this.reservationsSubject.next([...this.mockReservations]);
    // TODO: Firebase - Guardar nueva reserva en Firestore
    return of(newReservation).pipe(delay(400));
  }

  updateReservation(id: string, reservation: any): Observable<Reservation> {
    const index = this.mockReservations.findIndex(r => r.id === id);
    if (index > -1) {
      const updated = { ...this.mockReservations[index], ...reservation };
      this.mockReservations[index] = updated;
      this.reservationsSubject.next([...this.mockReservations]);
      // TODO: Firebase - Actualizar reserva en Firestore
      return of(updated).pipe(delay(400));
    }
    return of(reservation).pipe(delay(400));
  }

  deleteReservation(id: string): Observable<void> {
    this.mockReservations = this.mockReservations.filter(r => r.id !== id);
    this.reservationsSubject.next([...this.mockReservations]);
    // TODO: Firebase - Eliminar reserva de Firestore
    return of(void 0).pipe(delay(300));
  }

  cancelReservation(id: string): Observable<Reservation | undefined> {
    const reservation = this.mockReservations.find(r => r.id === id);
    if (reservation) {
      reservation.status = 'cancelled';
      this.reservationsSubject.next([...this.mockReservations]);
      // TODO: Firebase - Actualizar estado en Firestore
      return of(reservation).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  searchReservations(query: string): Observable<Reservation[]> {
    const filtered = this.mockReservations.filter(r =>
      r.guestName.toLowerCase().includes(query.toLowerCase()) ||
      r.guestEmail.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}
