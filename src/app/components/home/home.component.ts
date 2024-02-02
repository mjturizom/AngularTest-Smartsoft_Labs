import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sidebarOpen: boolean = false;
  isMobile: boolean = window.innerWidth < 768; // Ejemplo de breakpoint para móvil
  
  constructor() {
    window.onresize = () => {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.sidebarOpen = true; // Asegura que el sidebar esté abierto en pantallas grandes
      }
    };
  }
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
