import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  searchTracks(query: string): Observable<any> {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/search?q=${encodeURIComponent(query)}&type=track`, { headers });
  }
}
