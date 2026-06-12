import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-lg">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
            <i class="fas fa-user-plus text-3xl text-emerald-600"></i>
          </div>
          <h1 class="text-3xl font-semibold text-slate-900">Crear cuenta</h1>
          <p class="text-sm text-slate-600">Regístrate para gestionar hoteles</p>
        </div>

        <!-- Form -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Name -->
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-slate-700">
              Nombre completo
            </label>
            <div class="relative">
              <i class="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="Tu nombre completo"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                [class.border-red-500]="isFieldInvalid('name')"
              />
            </div>
            @if (isFieldInvalid('name')) {
              <p class="text-xs text-red-600 flex items-center gap-1">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ getErrorMessage('name') }}</span>
              </p>
            }
          </div>

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
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                [class.border-red-500]="isFieldInvalid('email')"
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
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-10 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label for="confirmPassword" class="block text-sm font-medium text-slate-700">
              Confirmar contraseña
            </label>
            <div class="relative">
              <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                id="confirmPassword"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="confirmPassword"
                placeholder="Repite tu contraseña"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-10 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                [class.border-red-500]="isFieldInvalid('confirmPassword')"
              />
            </div>
            @if (isFieldInvalid('confirmPassword')) {
              <p class="text-xs text-red-600 flex items-center gap-1">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ getErrorMessage('confirmPassword') }}</span>
              </p>
            }
          </div>

          <!-- Terms -->
          <div class="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              formControlName="terms"
              class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 mt-1"
            />
            <label for="terms" class="text-xs text-slate-600">
              Acepto los términos y condiciones
            </label>
          </div>
          @if (isFieldInvalid('terms')) {
            <p class="text-xs text-red-600 flex items-center gap-1">
              <i class="fas fa-exclamation-circle"></i>
              <span>Debes aceptar los términos</span>
            </p>
          }

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="registerForm.invalid"
            class="w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <i class="fas fa-user-plus"></i>
            Crear cuenta
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
        <div class="text-center text-sm">
          <span class="text-slate-600">¿Ya tienes cuenta? </span>
          <a routerLink="/login" class="font-semibold text-emerald-600 hover:underline">
            Inicia sesión aquí
          </a>
        </div>

        <!-- Info Message -->
        <div class="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700 border border-emerald-200 flex items-start gap-2">
          <i class="fas fa-check-circle mt-0.5 flex-shrink-0"></i>
          <span>Completa el formulario para crear tu cuenta y comenzar a gestionar hoteles.</span>
        </div>
      </div>
    </section>
  `,
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      const messages: { [key: string]: string } = {
        name: 'El nombre es obligatorio',
        email: 'El correo es obligatorio',
        password: 'La contraseña es obligatoria',
        confirmPassword: 'Debes confirmar la contraseña',
      };
      return messages[fieldName] || 'Este campo es obligatorio';
    }
    if (field.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        this.registerForm.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
        return;
      }

      console.log('Register:', {
        ...this.registerForm.value,
        confirmPassword: undefined,
      });
      // Aquí va la lógica de registro
    }
  }
}
