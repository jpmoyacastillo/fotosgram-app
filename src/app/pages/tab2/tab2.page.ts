import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];

  post = {
    mensaje: '',
    coords: null,
    position: false,
  };

  constructor(private postService: PostsService, private route: Router) {}

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
}
