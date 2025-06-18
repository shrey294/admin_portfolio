import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn=()=>{
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getAccessToken();

    if(!token){
        router.navigate(['/login']);
        return of(false);
    }

    return authService.refreshToken().pipe(
        switchMap((result)=>{
            if(result){
                return of(true);
            }
            else{
                authService.logout();
                router.navigate(['/login']);
                return of(false);
            }
        })
    );
};
    