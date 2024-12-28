import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarComponent],

  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userPhotoUrl: string = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  userName: string = 'John Doe';
  firstName: string = '';
  lastName: string = '';
  company: string = '';
  phone: string = '';
  website: string = '';
  visitors: number = 0;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  profilePic: File | null = null;
  remember: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
  }

  onSubmit() {
    console.log('Form submitted', {
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      phone: this.phone,
      website: this.website,
      visitors: this.visitors,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      remember: this.remember,
    });
    if (this.userPhotoUrl) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhotoUrl = e.target.result;
      };
      fetch(this.userPhotoUrl)
        .then(res => res.blob())
        .then(blob => reader.readAsDataURL(blob));
    }
  }

  onUserClick() {
    // Logic for handling user click on avatar
  }
}
