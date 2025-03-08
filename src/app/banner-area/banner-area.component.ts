import { Component, OnInit, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';  // Import HeaderComponent
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner-area',
  templateUrl: './banner-area.component.html',
  styleUrls: ['./banner-area.component.css'],
  imports:[FormsModule]
})
export class BannerAreaComponent implements OnInit {
  user: string = '';
  pass: string = '';
  isLoggedIn: boolean = false; // Track login state

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;

  constructor(
    private route: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Check login status on component initialization
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      this.isLoggedIn = true;
      this.addClassToHeader(); // Add class to header if logged in
    }
  }

  login(): void {
    if (this.user === 'shafay' && this.pass === '123') {
      alert("Login successful");
     
      this.isLoggedIn = true; // Set login state to true
     
      localStorage.setItem('isLoggedIn', 'true'); // Persist login state
      
      this.addClassToHeader(); // Add class to header when user logs in
      
      this.route.navigate(['/Dashboard02']);
      window.location.reload();
      
      
    } else {
      alert("Login failed");
    }
  }

  logout(): void {
    this.isLoggedIn = false; // Reset login state
    localStorage.setItem('isLoggedIn', 'false'); // Remove login state from localStorage

    this.removeClassFromHeader(); // Remove class from header when user logs out

    this.route.navigate(['/Home']); // Redirect to the home page
  }

  private addClassToHeader(): void {
    // Get the header element and add the 'logged-in' class
    const headerElement = document.querySelector('header');
    if (headerElement) {
      this.renderer.addClass(headerElement, 'logged-in');
    }
  }

  private removeClassFromHeader(): void {
    // Get the header element and remove the 'logged-in' class
    const headerElement = document.querySelector('header');
    if (headerElement) {
      this.renderer.removeClass(headerElement, 'logged-in');
    }
    // Manually trigger change detection to ensure Angular updates the DOM
    this.cdr.detectChanges(); 
  }
}
