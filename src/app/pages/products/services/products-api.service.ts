import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../shared/api/services/api.service';
import { environment } from '../../../../environments/environment';
import { ProductDto } from '../domain';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly apiService: ApiService = inject(ApiService);
  #baseUrl: string = environment.api.baseUrl + '/products';

  public getList(): Observable<ProductDto[]> {
    return this.apiService.httpClient.get<ProductDto[]>(this.#baseUrl);
  }

  public create(payload: ProductDto): Observable<ProductDto> {
    return this.apiService.httpClient.post<ProductDto>(this.#baseUrl, payload);
  }

  public update(payload: ProductDto): Observable<ProductDto> {
    return this.apiService.httpClient.post<ProductDto>(`${this.#baseUrl}/${payload.id}`, payload);
  }

  public delete(id: string): Observable<void> {
    return this.apiService.httpClient.delete<void>(`${this.#baseUrl}/${id}`);
  }
}
