import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  // Add properties for form fields
  firstName: string = '';
  lastName: string = '';
  company: string = '';
  phone: string = '';
  website: string = '';
  visitors: number | null = null;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  remember: boolean = false;
  profilePicUrl: string = 'path/to/default/profile-pic.jpg';
  profilePic: File | null = null;


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
    if (this.profilePic) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicUrl = e.target.result;
      };
      reader.readAsDataURL(this.profilePic);
    }
  }
}
