
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/photos';
  private allPhotos: Photo[] = [];

  constructor(private http: HttpClient) { }
  getPhotos(): Observable<Photo[]> {
    if (this.allPhotos.length > 0) {
      return of(this.allPhotos);
    }
    return this.http.get<Photo[]>(this.baseUrl).pipe(
      tap((photos) => this.allPhotos = photos),
      catchError((error) => {
        console.error('Error fetching photos', error);
        return of([]);
      })
    );
  }

  getPhotoById(id: number) {
    return this.http.get<Photo>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching photo with id ${id}`, error);
        return throwError(() => new Error(`Error fetching photo with id ${id}`));
      })
    );
  }
}
