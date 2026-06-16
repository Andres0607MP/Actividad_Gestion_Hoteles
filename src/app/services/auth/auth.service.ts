import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user
} from '@angular/fire/auth';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = user(this.auth);
  }

  register(email: string, password: string, nombre: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {

        const u = userCredential.user;

        await setDoc(doc(this.firestore, `Usuarios/${u.uid}`), {
          id: u.uid,
          nombre,
          correo: email,
          rol: 'usuario'
        });

        return userCredential;
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}