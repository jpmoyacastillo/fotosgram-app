import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

// import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { Geolocation } from '@capacitor/geolocation';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';

import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
  Photo,
} from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: SafeResourceUrl[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    position: false,
  };

  constructor(
    private postService: PostsService,
    private route: Router,
    private domSanitizer: DomSanitizer,
    private plt: Platform
  ) {}

  async crearPost() {
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      position: false,
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    Geolocation.getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.cargandoGeo = false;

        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        console.log(coords);
        this.post.coords = coords;
      })
      .catch((error) => {
        console.log('Error getting location', error);
        this.cargandoGeo = false;
      });
  }

  camara() {
    const options: ImageOptions = {
      quality: 60,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    };

    this.procesarImagen(options);
  }

  libreria() {
    const options: ImageOptions = {
      quality: 60,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: ImageOptions) {
    Camera.getPhoto(options).then(
      async (imageData) => {
        console.log(imageData);
        const img = this.domSanitizer.bypassSecurityTrustResourceUrl(
          imageData && imageData.webPath
        );

        // const fileData = await this.readAsBase64(imageData);
        // console.log(fileData);
        // this.startUpload(imageData.webPath);

        this.tempImages.push(imageData.dataUrl);
      },
      (err) => {
        // Handle error
      }
    );
  }

  // Convert the base64 to blob data
  // and create  formData with it
  async startUpload(data) {
    // const response = await fetch(data);
    // console.log(response);
    // const blob = await response.blob();
    const formData = new FormData();
    formData.append('image', data);
    this.postService.subirImagen(formData);
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  private async readAsBase64(photo: Photo) {
    const file = await Filesystem.readFile({
      path: photo.path,
    });

    return file.data;
  }
}
