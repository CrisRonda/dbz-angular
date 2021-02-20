import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.css'],
})
export class CardCharacterComponent implements OnInit {
  photos: Photo[] = [];
  constructor(public photoSService: PhotosService) {}
  ngOnInit() {
    this.photoSService.getPhotos().subscribe(
      (photos) => {
        console.log(photos);
        this.photos = photos;
      },
      (err) => console.log(err)
    );
  }
}
