import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
            <label for="email" class="block text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <div class="relative">
              <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="correo@ejemplo.com"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                [class.border-red-500]="isFieldInvalid('email')"
                [class.focus:ring-red-500/20]="isFieldInvalid('email')"
              />
            </div>
            @if (isFieldInvalid('email')) {
              <p class="text-xs text-red-600 flex items-center gap-1">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ getErrorMessage('email') }}</span>
              </p>
            }
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <div class="relative">
              <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                placeholder="Mínimo 6 caracteres"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-10 text-slate-900 placeholder-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                [class.border-red-500]="isFieldInvalid('password')"
              />
              <button
                type="button"
                (click)="togglePassword()"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            @if (isFieldInvalid('password')) {
              <p class="text-xs text-red-600 flex items-center gap-1">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ getErrorMessage('password') }}</span>
              </p>
            }
          </div>

          <!-- Remember me -->
          <div class="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              formControlName="remember"
              class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500"
            />
            <label for="remember" class="text-sm text-slate-600">
              Recuérdame en este dispositivo
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full rounded-lg bg-sky-600 py-2 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <i class="fas fa-sign-in-alt"></i>
            Iniciar sesión
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-slate-500">O</span>
          </div>
        </div>

        <!-- Links -->
        <div class="space-y-3 text-center text-sm">
          <div>
            <span class="text-slate-600">¿No tienes cuenta? </span>
            <a routerLink="/registro" class="font-semibold text-sky-600 hover:underline">
              Regístrate aquí
            </a>
          </div>
          <a href="#" class="block text-slate-600 hover:text-slate-900">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <!-- Message -->
        <div class="rounded-lg bg-blue-50 p-3 text-xs text-blue-700 border border-blue-200 flex items-start gap-2">
          <i class="fas fa-info-circle mt-0.5 flex-shrink-0"></i>
          <span>Usa cualquier email y contraseña para probar la aplicación.</span>
        </div>
      </div>
    </section>
  `,
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;

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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return fieldName === 'email' ? 'El correo es obligatorio' : 'La contraseña es obligatoria';
    }
    if (field.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (field.hasError('minlength')) {
      return 'Mínimo 6 caracteres';
    }
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      // Aquí va la lógica de autenticación
    }
  }
}

