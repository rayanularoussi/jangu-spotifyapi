import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  clientId: string = '';
  clientSecret: string = '';
  token: string = '';

  constructor(private http: HttpClient) {}

  login() {
    const url = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    this.http.post(url, body.toString(), { headers }).subscribe({
      next: (res : any) => {
        this.token = res.access_token;
        localStorage.setItem('spotify_token', res.access_token);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error fetching token:', err);
      }
    });
  }
}
