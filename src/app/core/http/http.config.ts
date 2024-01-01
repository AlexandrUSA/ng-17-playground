import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';

export const httpConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor, errorHandlerInterceptor])),
  ],
};
