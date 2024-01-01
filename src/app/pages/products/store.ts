import { signalStore, patchState, withMethods, withState } from '@ngrx/signals';
import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { finalize, lastValueFrom } from 'rxjs';

import { ProductDto, ProductsState } from './domain';
import { ProductsApiService } from './services/products-api.service';

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState<ProductsState>({
    items: [],
    total: 0,
    isLoading: false,
  }),
  withMethods(state => {
    const productsApiService: ProductsApiService = inject(ProductsApiService);

    return {
      load() {
        patchState(state, { isLoading: true });
        return lastValueFrom(
          productsApiService.getList().pipe(
            tap(response => patchState(state, { items: response, total: response.length })),
            finalize(() => patchState(state, { isLoading: false })),
          ),
        );
      },
      create(payload: ProductDto) {
        patchState(state, { isLoading: true });

        return lastValueFrom(
          productsApiService.create(payload).pipe(finalize(() => patchState(state, { isLoading: false }))),
        );
      },
      update(payload: ProductDto) {
        patchState(state, { isLoading: true });
        return lastValueFrom(
          productsApiService.update(payload).pipe(finalize(() => patchState(state, { isLoading: false }))),
        );
      },
      delete(id: string) {
        patchState(state, { isLoading: true });
        return lastValueFrom(
          productsApiService.delete(id).pipe(finalize(() => patchState(state, { isLoading: false }))),
        );
      },
    };
  }),
);
