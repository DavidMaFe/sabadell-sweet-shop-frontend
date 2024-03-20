import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

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

  private handleLoginError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Login failed'));
  }

  onLogin(): Observable<Login> {
    return this.http.post<Login>('https://dummyjson.com/auth/login', this.loginObject).pipe(
      catchError(this.handleLoginError)
    );
  }

  loginService() {
    this.onLogin().subscribe({
      complete: () => this.router.navigate(['/dashboard']),
      error: () => alert('Login failed')
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
