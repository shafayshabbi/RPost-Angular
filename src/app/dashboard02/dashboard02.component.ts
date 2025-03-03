import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard02',
  templateUrl: './dashboard02.component.html',
  styleUrls: ['./dashboard02.component.css'] // ✅ Fixed `styleUrls`
})

export class Dashboard02Component implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // this.loadScript('src/assets/myscript.js');  // ✅ Fixed Path
  }

  loadScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.defer = true;

    script.onload = () => console.log(`Loaded script: ${src}`);
    script.onerror = () => console.error(`Failed to load script: ${src}`);

    document.body.appendChild(script);
  }

  drgopen(){
    console.log('working hh')
  }
}
