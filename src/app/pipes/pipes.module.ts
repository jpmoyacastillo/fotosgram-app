import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImgSanitizerPipe } from './img-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, ImgSanitizerPipe, ImagenPipe],
  exports: [DomSanitizerPipe, ImgSanitizerPipe, ImagenPipe],
})
export class PipesModule {}
