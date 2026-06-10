import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { DashboardPage } from './pages/dashboard.page';
import { HotelsPage } from './pages/hotels.page';
import { RoomsPage } from './pages/rooms.page';
import { ReservationsPage } from './pages/reservations.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'hoteles', component: HotelsPage },
  { path: 'habitaciones', component: RoomsPage },
  { path: 'reservas', component: ReservationsPage },
  { path: '**', redirectTo: 'login' }
];
