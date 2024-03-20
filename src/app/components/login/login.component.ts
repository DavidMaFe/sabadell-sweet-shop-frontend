import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginObject: Login;
  constructor(private http: HttpClient, private router: Router) {
    this.loginObject = new Login('', '');
  }

  onLogin() {
    this.http.post('https://dummyjson.com/auth/login', this.loginObject)
      .subscribe((response:any) => {
        if(response.id){
          this.router.navigate(['/dashboard']);
        } else {
          alert(response.message);
        }
      });
  }
}

export class Login {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
