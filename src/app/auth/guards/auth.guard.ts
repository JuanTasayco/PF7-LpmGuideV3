import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { ModalChangesService } from 'src/app/shared/modal-changes.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const modalService = inject(ModalChangesService);
  const router = inject(Router);
  return authService.verifyToken().pipe(
    tap((resp) => {
      if (!resp) {
        modalService.setEventForOpenModal = authService.currentErrorMsg();

        setTimeout(() => {
          router.navigate(['/auth/login']);
        },500);
      }
    })
  );
};
