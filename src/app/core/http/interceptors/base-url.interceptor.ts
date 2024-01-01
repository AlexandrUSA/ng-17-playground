import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

const PROTOCOL_REG_EXP: RegExp = /^http[s]?:\/\//;

export const baseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const ignoredUrls: string[] = ['./assets'];
  const isAbsoluteUrl: boolean = PROTOCOL_REG_EXP.test(req.url);
  const isIgnoredUrl: boolean = ignoredUrls.some(item => req.url.indexOf(item) > -1);
  const url: string = isAbsoluteUrl || isIgnoredUrl ? req.url : environment.api.baseUrl + req.url;

  return next(req.clone({ url }));
};
