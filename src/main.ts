import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// importar Ionic PWA Elements library para funcionalidad nativa en el navegador
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Llamar el 'element loader' despues que la plataforma esta lanzada
defineCustomElements(window);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
