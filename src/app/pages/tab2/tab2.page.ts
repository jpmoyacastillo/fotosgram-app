import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare let window: any;

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
    private geolocation: Geolocation,
    private domSanitizer: DomSanitizer
  ) {}

  async crearPost() {
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      position: false,
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation
      .getCurrentPosition()
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
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    };

    this.procesarImagen(options);
  }

  libreria() {
    const options: ImageOptions = {
      quality: 60,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: ImageOptions) {
    Camera.getPhoto(options).then(
      (imageData) => {
        const img = this.domSanitizer.bypassSecurityTrustResourceUrl(
          imageData && imageData.webPath
        );

        this.tempImages.push(img);
      },
      (err) => {
        // Handle error
      }
    );
  }
}
