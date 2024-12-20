import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from "../common/nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-login',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  
  public enteredEmail: string = '';

  public adminData: any = {}
  isEditable = false;

  constructor(
    private http: HttpClient,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.enteredEmail = this.adminService.getEmail();
    this.loadValues();
  }

  onSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.adminData.imagePath = "assets/admins/" + file.name;
    }
  }

  loadValues() {
    this.http.get(`http://localhost:8080/admin/search-by-email/${this.enteredEmail}`).subscribe(data => {
      this.adminData = data;
    })
  }

  editProfile() {
    this.isEditable = true
  }

  saveProfile() {
    this.http.put("http://localhost:8080/admin/update-admin", this.adminData).subscribe({
      next: (Response) => {
        alert("profile updated successfully");
        this.isEditable = false;
        this.loadValues();
      }
    })
  }
  deleteProfile() {
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      this.http.delete(`http://localhost:8080/admin/delete-admin/${this.adminData.id}`).subscribe({
        next: (response) => {
          alert("profile deleted successfully");
          this.router.navigate(["/admin-login"]);
        }
      })
    }
  }
}
