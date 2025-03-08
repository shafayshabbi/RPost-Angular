import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMenuOpen: boolean = false; 

  constructor(private route: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = loggedInStatus === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.route.navigate(['/Home']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  triggerChangeDetection(): void {
    this.cdRef.detectChanges();
  }
}
