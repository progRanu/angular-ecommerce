export interface ToastMessage {
  type: 'success' | 'error' | 'info'|'warning';
  message: string;
}
