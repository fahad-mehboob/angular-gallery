import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Photo, PhotoService } from "../../services/photo.service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { provideHttpClient } from "@angular/common/http";

@Component({
  selector: "app-photo-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./photo-detail.component.html",
  styleUrl: "./photo-detail.component.css",
})
export class PhotoDetailComponent {
  photo$?: Observable<Photo>;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id && !isNaN(id)) {
      this.photo$ = this.photoService.getPhotoById(id);
    }
  }
}
