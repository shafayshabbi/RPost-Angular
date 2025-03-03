import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent {
  imageUrl: string | null = null;
  drawing = false;

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('previewImage') previewImage!: ElementRef<HTMLImageElement>;
  private ctx!: CanvasRenderingContext2D | null;

  // ✅ Handle Drag Over Event (Prevents Default Behavior)
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // ✅ Handle File Drop Event
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    }
  }

  // ✅ Handle File Selection via Input
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.processFile(file);
  }

  // ✅ Process Uploaded File
  private processFile(file: File) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        setTimeout(() => this.setupCanvas(), 200);
      };
    }
  }

  // ✅ Setup Canvas (Ensure Proper Initialization)
  setupCanvas() {
    console.log('Setting up canvas...');
    if (!this.signatureCanvas) {
      console.error('Canvas element not found!');
      return;
    }

    const canvas = this.signatureCanvas.nativeElement;
    const img = this.previewImage?.nativeElement;

    if (!img) {
      console.error('Image element not found!');
      return;
    }

    // Match the canvas size with the image size
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      console.error('Canvas context not initialized!');
      return;
    }

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black';

    // Attach drawing event listeners
    canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    canvas.addEventListener('mousemove', (e) => this.draw(e));
    canvas.addEventListener('mouseup', () => this.stopDrawing());
    canvas.addEventListener('mouseout', () => this.stopDrawing());

    console.log('Canvas setup complete.');
  }

  // ✅ Start Drawing on Canvas
  private startDrawing(event: MouseEvent) {
    if (!this.ctx) return;
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
    console.log('Started drawing at:', event.offsetX, event.offsetY);
  }

  // ✅ Draw on Canvas
  private draw(event: MouseEvent) {
    if (!this.drawing || !this.ctx) return;
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
    console.log('Drawing at:', event.offsetX, event.offsetY);
  }

  // ✅ Stop Drawing
  private stopDrawing() {
    this.drawing = false;
    console.log('Stopped drawing');
  }

  // ✅ Clear the Signature
  clearSignature() {
    if (this.ctx && this.signatureCanvas) {
      this.ctx.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
    }
  }

  // ✅ Save the Signed Image
  saveImage() {
    if (!this.signatureCanvas || !this.previewImage) {
      console.error('Canvas or Image not found!');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get context for saving image');
      return;
    }

    const img = this.previewImage.nativeElement;
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the uploaded image first
    ctx.drawImage(img, 0, 0, img.width, img.height);
    
    // Draw the signature on top
    ctx.drawImage(this.signatureCanvas.nativeElement, 0, 0);

    // Download the combined image
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'signed-image.png';
    link.click();

    console.log('Image saved successfully.');
  }
}
