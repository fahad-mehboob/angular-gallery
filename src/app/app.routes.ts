import { Routes } from '@angular/router';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { PhotoGridComponent } from './components/photo-grid/photo-grid.component';

export const routes: Routes = [
    { path: 'photo/:id', loadComponent: () => import('./components/photo-detail/photo-detail.component').then(m => m.PhotoDetailComponent) },
    { path: '', component: PhotoGridComponent },
    { path: '**', redirectTo: '' }
];
