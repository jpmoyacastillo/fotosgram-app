import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  usuario: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async actualizar(fActualizar: HTMLFormElement) {
    if (fActualizar.invalid) {
      return;
    }

    const actualizado = await this.usuarioService.actualizarUsuario(
      this.usuario
    );

    if (actualizado) {
      // toast mensaje de actualizado
      this.uiService.presentToast('Registro Actualizado');
    } else {
      // toast con el error
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  logout() {
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }
}
