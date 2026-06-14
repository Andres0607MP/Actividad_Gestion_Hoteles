import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reserva } from '../../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private collectionName = 'reservas';

  constructor(private firestore: Firestore) {}

  getReservas(): Observable<Reserva[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<Reserva[]>;
  }

  addReserva(reserva: Reserva) {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, reserva);
  }

  updateReserva(id: string, reserva: Partial<Reserva>) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(ref, reserva);
  }

  deleteReserva(id: string) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(ref);
  }
}