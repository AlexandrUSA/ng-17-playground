import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ProductsStore } from '../../store';
import { ProductDto } from '../../domain';
import { mutateSignal } from '../../services/products-store.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  public readonly store = inject(ProductsStore);
  public items!: Signal<ProductDto[]>;
  public isLoading!: Signal<boolean>;
  public message: WritableSignal<any> = signal({ active: true, archived: true });

  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        mutateSignal(this.message, state => (state.active = false));
      }, 3000);
    });
  }

  public ngOnInit(): void {
    this.items = this.store.items;
    this.isLoading = this.store.isLoading;
    this.store.load();
  }
}
