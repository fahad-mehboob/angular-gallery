// src/app/components/photo-grid/photo-grid.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { PhotoService, Photo } from '../../services/photo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-photo-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {
  displayedPhotos: Photo[] = [];
  photos$: Observable<Photo[]> | null = null; // Observable for async pipe
  loading = false;
  start = 0;
  limit = 20;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.loadInitialPhotos()
  }

  loadInitialPhotos(): void {
    this.photos$ = this.photoService.getPhotos().pipe(
      map(photos => photos.slice(this.start, this.start + this.limit))
    );
    this.start += this.limit;
  }

  // getAllPhotos() {
  //   if (this.loading) return;
  //   this.loading = true;
  //   this.photoService.getPhotos(this.start, this.limit).subscribe({
  //     next: (photos) => {
  //       this.photos = [...this.photos, ...photos];
  //       this.start += this.limit; // Increase the starting index for the next set
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading photos', error);
  //       this.hasPhotos = false;
  //     }
  //   });
  // }

  loadMorePhotos(): void {
    this.photos$ = this.photoService.getPhotos().pipe(
      map((photos) => {
        // Append the next set of photos to displayedPhotos
        this.displayedPhotos = [...this.displayedPhotos, ...photos.slice(this.start, this.start + this.limit)];
        this.start += this.limit;
        return this.displayedPhotos;
      })
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    console.log("🚀 ~ PhotoGridComponent ~ onScroll ~ window.scrollY:", window.scrollY)
    debugger
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100) {
      // Trigger loading more photos when close to the bottom
      this.loadMorePhotos();
    }
  }
}
