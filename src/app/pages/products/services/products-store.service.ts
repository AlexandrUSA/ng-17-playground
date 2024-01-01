import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ProductsState } from '../domain';
import { ProductsApiService } from './products-api.service';
import { finalize, lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

export const mutateSignal = <T extends object>(
  signal: WritableSignal<T>,
  mutateCallback: (prevState: T) => void,
): void => {
  signal.update((prevState: T) => {
    const state: T = cloneDeep(prevState);

    mutateCallback(state);

    return state;
  });
};

export const mergeSignal = <T extends object>(signal: WritableSignal<T>, value: Partial<T>): void => {
  signal.update((prevState: T) => merge(prevState, value));
};

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  public state: WritableSignal<ProductsState> = signal<ProductsState>({
    items: [],
    total: 0,
    isLoading: false,
  });

  private readonly productsApiService: ProductsApiService = inject(ProductsApiService);

  public async loadProducts() {
    mutateSignal(this.state, prevState => (prevState.isLoading = true));
    mergeSignal(this.state, { items: [] });

    lastValueFrom(
      this.productsApiService.getList().pipe(
        tap(response => mutateSignal(this.state, state => (state.items = response))),
        finalize(() => mutateSignal(this.state, prevState => (prevState.isLoading = false))),
      ),
    );
  }
}
