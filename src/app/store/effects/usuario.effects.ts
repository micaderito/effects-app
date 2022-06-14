import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as usuariosActions from '../actions/usuario.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEfects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuario),
      mergeMap((action) =>
        this.usuarioService
          .getUserById(action.id)
          .pipe(
            map((usuario) => usuariosActions.cargarUsuarioSuccess({ usuario })),
            catchError( err => of(usuariosActions.cargarUsuarioError({payload: err})))
          )
      )
    )
  );


}
