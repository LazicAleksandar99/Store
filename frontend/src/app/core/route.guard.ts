import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenAuthorization } from "../models/token";
import { TokenService } from "../services/token.service";

@Injectable({
    'providedIn': 'root'
})
export class RouteGuard implements CanActivate {

    tokenInfo!: TokenAuthorization;
    constructor(private router: Router,
                private tokenService: TokenService) { }

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
        if (localStorage.getItem('token')){

            this.tokenInfo = this.tokenService.getTokenInformation(localStorage.getItem('token') as string);

            if(this.tokenInfo.role.includes(_route.data['r1']) || 
               this.tokenInfo.role.includes(_route.data['r2']) || 
               this.tokenInfo.role.includes(_route.data['r3'])){
               return true; 
            }
            else{
            this.router.navigate(['/login']);
            return false;
            }
        }
        else {
           this.router.navigate(['/login']);
           return false;
        }
    }

}