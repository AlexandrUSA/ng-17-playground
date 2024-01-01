import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const matSnackBar: MatSnackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap({
      error: error =>
        matSnackBar.open(error.error?.errorDescription || 'Unknown HTTP error', 'Dismiss', {
          verticalPosition: 'top',
          horizontalPosition: 'end',
        }),
    }),
  );
};
