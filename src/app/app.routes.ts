import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardPage } from './pages/dashboard.page';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { HotelsPage } from './pages/hotels.page';
import { RoomsPage } from './pages/rooms.page';
import { ReservationsPage } from './pages/reservations.page';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  { path: 'hoteles', component: HotelsPage, canActivate: [authGuard] },
  { path: 'habitaciones', component: RoomsPage, canActivate: [authGuard] },
  { path: 'reservas', component: ReservationsPage, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
