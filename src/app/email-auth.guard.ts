import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AdminService } from "./admin.service";

@Injectable({
    providedIn: 'root',
})

export class EmailAuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private adminservice:AdminService
    ){}

    canActivate(): boolean {
        const userEmail = this.adminservice.getEmail();
        if (userEmail && userEmail.length > 0) {
            return true;
        }
        this.adminservice.setEmail('');
        this.router.navigate(['/admin-login']);
        return false;
    }
}