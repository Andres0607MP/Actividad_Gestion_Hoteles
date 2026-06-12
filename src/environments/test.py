import { Firestore, collection, addDoc } from '@angular/fire/firestore';

constructor(private firestore: Firestore) {}

async test() {
  const ref = collection(this.firestore, 'TEST');

  await addDoc(ref, {
    mensaje: 'Firestore funcionando',
    fecha: new Date()
  });

  console.log('OK Firebase');
}