import { Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastComponent!: ToastComponent;

  register(component: ToastComponent) {
    this.toastComponent = component;
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastComponent?.show(message, type);
  }
}
