import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      @for (toast of toasts(); track toast.id) {
        <div
          [ngClass]="getToastClasses(toast.type)"
          class="animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto"
          (click)="removeToast(toast.id)"
        >
          <div class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm">
            <span [ngClass]="getIconClasses(toast.type)" class="text-lg flex-shrink-0"></span>
            <p class="text-sm font-medium flex-grow">{{ toast.message }}</p>
            <button
              class="text-lg opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in-from-top {
      from {
        transform: translateY(-1rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .slide-in-from-top-2 {
      animation: slide-in-from-top 0.3s ease-out;
    }

    .fade-in {
      animation: fade-in 0.3s ease-out;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `]
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts$;

  removeToast(id: string) {
    this.toastService.remove(id);
  }

  getToastClasses(type: string): string {
    const baseClasses = 'border';
    const typeClasses: Record<string, string> = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };
    return `${baseClasses} ${typeClasses[type] || typeClasses['info']}`;
  }

  getIconClasses(type: string): string {
    const iconClasses: Record<string, string> = {
      success: 'fas fa-check-circle text-green-600',
      error: 'fas fa-exclamation-circle text-red-600',
      info: 'fas fa-info-circle text-blue-600',
      warning: 'fas fa-exclamation-triangle text-yellow-600'
    };
    return iconClasses[type] || iconClasses['info'];
  }
}
