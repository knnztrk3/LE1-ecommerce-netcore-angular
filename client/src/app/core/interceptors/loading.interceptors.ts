import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyService: BusyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('emailexists')) {
            this.busyService.busy();
        }
        return next.handle(req).pipe(
            delay(1000),
            finalize(() => {
                this.busyService.idle();
            })
        );
    }
}