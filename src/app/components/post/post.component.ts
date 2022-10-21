import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };

  // img1 = '/assets/space-1.jpg';
  // img2 = '/assets/space-2.jpg';
  // img3 = '/assets/space-3.jpg';

  constructor() {}

  ngOnInit() {}
}
