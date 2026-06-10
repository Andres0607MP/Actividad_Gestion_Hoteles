import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-lg space-y-6 rounded-3xl bg-white p-8 shadow-lg">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
            <i class="fas fa-user-plus text-3xl text-emerald-600"></i>
          </div>
          <h1 class="text-3xl font-semibold text-slate-900">Crear cuenta</h1>
          <p class="text-sm text-slate-600">Regístrate y comienza a gestionar tus hoteles</p>
        </div>

        <!-- Form -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Name Row -->
          <div class="grid gap-4 sm:grid-cols-2">
            <!-- First Name -->
            <div class="space-y-2">
              <label for="firstName" class="block text-sm font-medium text-slate-700">
                Nombre
              </label>
              <div class="relative">
                <i class="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  placeholder="Juan"
                  class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  [class.border-red-500]="isFieldInvalid('firstName')"
                />
              </div>
              @if (isFieldInvalid('firstName')) {
                <p class="text-xs text-red-600 flex items-center gap-1">
                  <i class="fas fa-exclamation-circle"></i>
                  <span>{{ getErrorMessage('firstName') }}</span>
                </p>
              }
            </div>

            <!-- Last Name -->
            <div class="space-y-2">
              <label for="lastName" class="block text-sm font-medium text-slate-700">
                Apellido
              </label>
              <div class="relative">
                <i class="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  placeholder="Pérez"
                  class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  [class.border-red-500]="isFieldInvalid('lastName')"
                />
              </div>
              @if (isFieldInvalid('lastName')) {
                <p class="text-xs text-red-600 flex items-center gap-1">
                  <i class="fas fa-exclamation-circle"></i>
                  <span>{{ getErrorMessage('lastName') }}</span>
                </p>
              }
            </div>
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

          <!-- Password Row -->
          <div class="grid gap-4 sm:grid-cols-2">
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
                  placeholder="Min. 6 caracteres"
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
                  class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
          </div>

          <!-- Terms & Conditions -->
          <div class="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              formControlName="terms"
              class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
            />
            <label for="terms" class="text-sm text-slate-600">
              Acepto los
              <a href="#" class="font-semibold text-emerald-600 hover:underline">términos y condiciones</a>
              y la
              <a href="#" class="font-semibold text-emerald-600 hover:underline">política de privacidad</a>
            </label>
          </div>
          @if (registerForm.get('terms') && registerForm.get('terms')?.touched && !registerForm.get('terms')?.value) {
            <p class="text-xs text-red-600 flex items-center gap-1">
              <i class="fas fa-exclamation-circle"></i>
              <span>Debes aceptar los términos y condiciones</span>
            </p>
          }

          <!-- Error Message -->
          @if (errorMessage) {
            <div class="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200 flex items-start gap-2">
              <i class="fas fa-exclamation-triangle mt-0.5 flex-shrink-0"></i>
              <span>{{ errorMessage }}</span>
            </div>
          }

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="registerForm.invalid || isLoading"
            class="w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            @if (isLoading) {
              <i class="fas fa-spinner fa-spin"></i>
              <span>Creando cuenta...</span>
            } @else {
              <i class="fas fa-user-check"></i>
              <span>Crear cuenta</span>
            }
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

        <!-- Link to Login -->
        <div class="text-center text-sm">
          <span class="text-slate-600">¿Ya tienes cuenta? </span>
          <a routerLink="/login" class="font-semibold text-emerald-600 hover:underline">
            Inicia sesión aquí
          </a>
        </div>
      </div>
    </section>
  `,
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    }

    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      const labels: { [key: string]: string } = {
        firstName: 'El nombre es obligatorio',
        lastName: 'El apellido es obligatorio',
        email: 'El correo es obligatorio',
        password: 'La contraseña es obligatoria',
        confirmPassword: 'Debes confirmar tu contraseña',
      };
      return labels[fieldName] || 'Este campo es obligatorio';
    }
    if (field.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength')?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
      };

      this.authService.register(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Error al crear la cuenta. Intenta nuevamente.';
        }
      });
    }
  }
}
