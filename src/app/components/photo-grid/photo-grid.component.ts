import { Component, HostListener, OnInit } from '@angular/core';
import { PhotoService, Photo } from '../../services/photo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  photos$: Observable<Photo[]> | null = null;
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

  loadMorePhotos(): void {
    this.photos$ = this.photoService.getPhotos().pipe(
      map((photos) => {
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
      this.loadMorePhotos();
    }
  }
}
