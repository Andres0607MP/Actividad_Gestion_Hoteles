import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-lg">

        <!-- Header -->
        <div class="space-y-2 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
            <i class="fas fa-sign-in-alt text-3xl text-sky-600"></i>
          </div>
          <h1 class="text-3xl font-semibold text-slate-900">Iniciar sesión</h1>
          <p class="text-sm text-slate-600">Accede a tu panel de gestión de hoteles</p>
        </div>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">

          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700">Correo electrónico</label>

            <div class="relative">
              <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

              <input
                type="email"
                formControlName="email"
                placeholder="correo@ejemplo.com"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4"
                [class.border-red-500]="isFieldInvalid('email')"
              />
            </div>

            @if (isFieldInvalid('email')) {
              <p class="text-xs text-red-600">{{ getErrorMessage('email') }}</p>
            }
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700">Contraseña</label>

            <div class="relative">
              <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

              <input
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                placeholder="Mínimo 6 caracteres"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-10"
                [class.border-red-500]="isFieldInvalid('password')"
              />

              <button
                type="button"
                (click)="togglePassword()"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            @if (isFieldInvalid('password')) {
              <p class="text-xs text-red-600">{{ getErrorMessage('password') }}</p>
            }
          </div>

          <!-- Remember -->
          <div class="flex items-center gap-2">
            <input type="checkbox" formControlName="remember" />
            <label class="text-sm text-slate-600">Recuérdame</label>
          </div>

          <!-- Button -->
          <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full rounded-lg bg-sky-600 py-2 text-white font-semibold disabled:opacity-50"
          >
            Iniciar sesión
          </button>
        </form>

        <!-- Links -->
        <div class="text-center text-sm space-y-2">
          <div>
            <span>¿No tienes cuenta?</span>
            <a routerLink="/registro" class="text-sky-600 font-semibold"> Regístrate</a>
          </div>

          <a href="#" class="text-slate-600">¿Olvidaste tu contraseña?</a>
        </div>

      </div>
    </section>
  `,
})
export class LoginPage {

  loginForm: FormGroup;
  showPassword = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(field: string): boolean {
    const f = this.loginForm.get(field);
    return !!(f && f.invalid && (f.dirty || f.touched));
  }

  getErrorMessage(field: string): string {
    const f = this.loginForm.get(field);
    if (!f) return '';

    if (f.hasError('required')) {
      return field === 'email'
        ? 'El correo es obligatorio'
        : 'La contraseña es obligatoria';
    }

    if (f.hasError('email')) return 'Correo inválido';
    if (f.hasError('minlength')) return 'Mínimo 6 caracteres';

    return '';
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    try {
      const userCredential = await this.authService.login(email, password);

      console.log('Usuario logueado:', userCredential.user);

      this.router.navigate(['/dashboard']);

    } catch (error: any) {
      console.error('Error login:', error.message);
      
      if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else if (error.code === 'auth/invalid-credential') {
        alert('Correo o contraseña incorrectos');
      } else {
        alert('Error al iniciar sesión: ' + error.message);
      }
    }
  }
}