import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CheckIfAuthenticate } from "./authorize-auth.interceptor";
import { DefaultInterceptor } from "./default.interceptor";



export const httpInterceptorProvider = [
    {provide : HTTP_INTERCEPTORS, useClass : DefaultInterceptor, multi : true},
    //{provide : HTTP_INTERCEPTORS, useClass : CheckIfAuthenticate, multi : true}
]