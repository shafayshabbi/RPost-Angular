import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
// import { AuthService } from '../auth.service11';  // Import the AuthService

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private route: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Check login status on component initialization
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = loggedInStatus === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false'); // Remove login state
    this.isLoggedIn = false;
    this.route.navigate(['/Home']); // Redirect to home page
  }

   // Method to manually trigger change detection
   triggerChangeDetection(): void {
    this.cdRef.detectChanges();
  }
  
}
