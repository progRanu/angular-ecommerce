import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastMessage } from '../toast.model';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  standalone: true
})
export class ToastComponent {
toasts: ToastMessage[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const toast: ToastMessage = { type, message };
    this.toasts.push(toast);

    setTimeout(() => this.close(toast), duration);
  }

  close(toast: ToastMessage) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getClass(type: string): string {
    return `toast ${type}`;
  }
}
