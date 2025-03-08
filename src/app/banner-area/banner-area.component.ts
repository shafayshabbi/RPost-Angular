import { Component, OnInit, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
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
  isLoggedIn: boolean = false; 

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;

  constructor(
    private route: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      this.isLoggedIn = true;
      this.addClassToHeader(); 
    }
  }

  login(): void {
    if (this.user === 'shafay' && this.pass === '123') {
      alert("Login successful");
     
      this.isLoggedIn = true; 
     
      localStorage.setItem('isLoggedIn', 'true'); 
      
      this.addClassToHeader(); 
      
      this.route.navigate(['/Dashboard']).then(() => {
        window.location.reload();
      });
      
      
    } else {
      alert("Login failed");
    }
  }

  logout(): void {
    this.isLoggedIn = false; 
    localStorage.setItem('isLoggedIn', 'false'); 

    this.removeClassFromHeader(); 

    this.route.navigate(['/Home']); 
  }

  private addClassToHeader(): void {
    
    const headerElement = document.querySelector('header');
    if (headerElement) {
      this.renderer.addClass(headerElement, 'logged-in');
    }
  }

  private removeClassFromHeader(): void {
    
    const headerElement = document.querySelector('header');
    if (headerElement) {
      this.renderer.removeClass(headerElement, 'logged-in');
    }
    this.cdr.detectChanges(); 
  }
}
