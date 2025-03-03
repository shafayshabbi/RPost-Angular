import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner-area',
  imports: [FormsModule],
  templateUrl: './banner-area.component.html',
  styleUrl: './banner-area.component.css'
})
export class BannerAreaComponent implements OnInit{
  user: string = '';
  pass: string = '';
  isLoggedIn: boolean = false; // Track login state

  constructor(private route:Router) {}

  ngOnInit(): void {
    
  }

  login(): void {
    if (this.user === 'shafay' && this.pass === '123') {
      alert("Login successful");
      this.isLoggedIn = true; // Set login state to true
      this.route.navigate(['Dashboard']);
    } else {
      alert("Login failed");
    }
  }

  logout(): void {
    this.isLoggedIn = false; // Reset login state
    this.route.navigate(['/Home']); // Redirect to the home page
  }

}
