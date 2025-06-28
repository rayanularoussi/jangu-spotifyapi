import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ListMusicComponent } from './components/list-music/list-music.component';
import { MusicDetailsComponent } from './components/music-details/music-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    AuthComponent,
    SearchBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  hasToken = false;
  showAuth = false;

  ngOnInit() {
    this.hasToken = localStorage.getItem('spotify_token') !== null;
  }

  onTokenSet() {
    this.hasToken = true;
    this.showAuth = false;
  }

  redirectToAuth() {
    this.showAuth = true;
  }
}
