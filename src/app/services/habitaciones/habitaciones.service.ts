import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Habitacion } from '../../models/habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private collectionName = 'habitaciones';

  constructor(private firestore: Firestore) {}

  getHabitaciones(): Observable<Habitacion[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<Habitacion[]>;
  }

  addHabitacion(habitacion: Habitacion) {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, habitacion);
  }

  updateHabitacion(id: string, habitacion: Partial<Habitacion>) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(ref, habitacion);
  }

  deleteHabitacion(id: string) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(ref);
  }
}


