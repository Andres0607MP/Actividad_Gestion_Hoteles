import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { DashboardPage } from './pages/dashboard.page';
import { HotelsPage } from './pages/hotels.page';
import { RoomsPage } from './pages/rooms.page';
import { ReservationsPage } from './pages/reservations.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'registro', component: RegisterPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  { path: 'hoteles', component: HotelsPage, canActivate: [authGuard] },
  { path: 'habitaciones', component: RoomsPage, canActivate: [authGuard] },
  { path: 'reservas', component: ReservationsPage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

