import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";




export class DefaultInterceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('authToken');
        const currentUser = localStorage.getItem('currentUser');
        if(currentUser && authToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
        }
        return next.handle(req)
    }
}