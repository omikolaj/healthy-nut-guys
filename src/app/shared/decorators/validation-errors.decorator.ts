import { HttpStatusInterceptorService } from 'app/core/http-interceptors/http-status.interceptor.service';
import { rootInjector } from 'root-injector';

export function ValidationErrors() {
  return function(target: any, key: string): void {
    const service = rootInjector.get(HttpStatusInterceptorService);
    target[key] = service.getValidationErrors$;
  };
}
