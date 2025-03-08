import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard02',
  templateUrl: './dashboard02.component.html',
  styleUrls: ['./dashboard02.component.css'],
  imports: [CommonModule, NgIf]
})
export class Dashboard02Component implements OnInit {

  uploading: boolean = false;
  progress: number = 0;
  uploadedImage: string | null = null;
  draggedImage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    if (!localStorage.getItem('dashboardReloaded')) {
     
      localStorage.setItem('dashboardReloaded', 'true');
      
      this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
        
        console.log('Page reloaded and initialized');
      });
    } else {
      
      console.log('Page loaded after initial reload');
    }
  }

 
  // Image drag and drop logic
  onDragStart(event: DragEvent, imgNumber: number): void {
    this.draggedImage = imgNumber === 1 ? 'sign-one.png' : 'stamp1.png';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.uploadedImage && this.draggedImage) {
      const droppedImage = this.draggedImage;
      const imgElement = document.createElement('img');
      imgElement.src = droppedImage;
      imgElement.style.position = 'absolute';
      imgElement.style.left = `${event.offsetX}px`;
      imgElement.style.top = `${event.offsetY}px`;

      const uploadedImageContainer = document.querySelector('.uploaded-image');
      if (uploadedImageContainer) {
        uploadedImageContainer.appendChild(imgElement);
      }
    }
  }


  // Handle touch events for mobile devices
onTouchStart(event: TouchEvent, imgNumber: number): void {
  
  this.draggedImage = imgNumber === 1 ? 'sign-one.png' : (imgNumber === 2 ? 'stamp1.png' : '');
  event.preventDefault();
}

onTouchMove(event: TouchEvent): void {
  event.preventDefault();
}

onTouchEnd(event: TouchEvent): void {
  if (this.uploadedImage && this.draggedImage) {
    const touch = event.changedTouches[0];
    const uploadedImageContainer = document.querySelector('.uploaded-image') as HTMLElement;

    // Get the container's position
    const rect = uploadedImageContainer.getBoundingClientRect();
    const droppedImage = this.draggedImage;
    const imgElement = document.createElement('img');
    imgElement.src = droppedImage;
    imgElement.style.position = 'absolute';
    imgElement.style.left = `${touch.pageX - rect.left}px`;
    imgElement.style.top = `${touch.pageY - rect.top}px`;

    // Append the dragged image to the uploaded image container
    uploadedImageContainer.appendChild(imgElement);
  }
}

  // Image upload logic with progress bar
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploading = true;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        this.uploading = false;
      };

      reader.onprogress = (e: ProgressEvent) => {
        if (e.lengthComputable) {
          this.progress = (e.loaded / e.total) * 100;
        }
      };

      reader.readAsDataURL(file);
    }
  }

 
  // Save the uploaded image to PDF
  saveToPDF(): void {
    const content = document.querySelector('.right-panel');
    if (content) {
      html2canvas(content).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF();
        const pdfWidth = 210; 
        const pdfHeight = 297;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('image.pdf');
      });
    } else {
      console.error('Right panel not found!');
    }
  }
}
