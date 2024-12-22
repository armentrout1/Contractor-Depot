import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-home-bar',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for structural directives
  templateUrl: './home-bar.component.html',
  styleUrls: ['./home-bar.component.scss'],
})
export class HomeBarComponent {
  isHidden = false; // Tracks if the header is hidden
  isDropdownOpen = false; // Tracks dropdown state
  lastScrollPosition = 0; // Tracks the last scroll position

  constructor(private router: Router) {} // Add Router for navigation

  // Handles scroll behavior for hiding and showing header
  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScroll = window.scrollY;

    if (currentScroll > this.lastScrollPosition && currentScroll > 50) {
      this.isHidden = true; // Hide header
    } else {
      this.isHidden = false; // Show header
    }

    this.lastScrollPosition = currentScroll;
  }

  // Toggles dropdown visibility
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handles dropdown item clicks
  onClickOption(option: string): void {
    if (option === 'View Profile') {
      this.router.navigate(['/profile']); // Navigate to Profile page
    } else if (option === 'Settings') {
      console.log('Settings clicked');
    } else if (option === 'Log Out') {
      console.log('Log Out clicked');
    }
    this.isDropdownOpen = false; // Close dropdown after action
  }

  // Placeholder for navigating home
  navigateHome(): void {
    console.log('Navigating to home');
  }

  // Closes dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      this.isDropdownOpen = false; // Close dropdown if outside click
    }
  }
}
