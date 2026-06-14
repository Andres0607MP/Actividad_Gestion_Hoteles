import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hotel } from '../../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private collectionName = 'hoteles';

  constructor(private firestore: Firestore) {}

  getHoteles(): Observable<Hotel[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<Hotel[]>;
  }

  addHotel(hotel: Hotel) {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, hotel);
  }

  updateHotel(id: string, hotel: Partial<Hotel>) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(ref, hotel);
  }

  deleteHotel(id: string) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(ref);
  }
}