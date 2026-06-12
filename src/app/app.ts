import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar.component';
import { FooterComponent } from './shared/footer.component';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('Actividad_Gestion_Hoteles');
  protected readonly status = signal<'pending' | 'connected' | 'disconnected'>('pending');
  protected readonly error = signal<string | null>(null);
  protected showErrorDetails = false;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      const ref = collection(this.firestore, 'TEST');
      await getDocs(ref);
      this.status.set('connected');
      this.error.set(null);
    } catch (err) {
      this.status.set('disconnected');
      this.error.set(err instanceof Error ? err.message : String(err));
      console.error('Firebase connection error:', err);
    }
  }
}
