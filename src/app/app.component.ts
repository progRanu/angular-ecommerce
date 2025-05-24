import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast.component';
import { ToastService } from './shared/toast/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('globalToast') toastComponent!: ToastComponent;
  constructor(private toastService: ToastService) {}

  ngAfterViewInit() {
    this.toastService.register(this.toastComponent);
  }
  title = 'angular-ecommerce';
}
