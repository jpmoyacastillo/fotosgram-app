import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImgSanitizerPipe } from './img-sanitizer.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, ImgSanitizerPipe],
  exports: [DomSanitizerPipe, ImgSanitizerPipe],
})
export class PipesModule {}
