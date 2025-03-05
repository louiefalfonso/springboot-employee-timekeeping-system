import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
 
})
export class NavbarComponent {
  constructor(private elementRef: ElementRef) { }

  toggleMobileMenu() {
    const mobileMenu = this.elementRef.nativeElement.querySelector('#mobile-menu');
    const mobileMenuToggle = this.elementRef.nativeElement.querySelector('.mobile-menu-toggle');
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }
}