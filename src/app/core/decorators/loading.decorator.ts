import { rootInjector } from 'root-injector';
import { HttpStatusInterceptorService } from 'app/core/http-interceptors/http-status.interceptor.service';

export function Loading() {
  return function(target: any, key: string): void {
    const service = rootInjector.get(HttpStatusInterceptorService);
    target[key] = service.loading$;
  };
}
