import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotifyApiService } from '../../services/spotify-api.service';
import { ListMusicComponent } from '../list-music/list-music.component';
import { MusicDetailsComponent } from '../music-details/music-details.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ListMusicComponent,
    MusicDetailsComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchControl = new FormControl('');
  allTracks: any[] = [];
  filteredTrack: any[] = [];
  selectedAlbum: string = '';
  albums: string[] = [];
  selectedTrack: any = null;
  selectedGenre: any = null;
  genres: string[] = [];
  startDate: string = '';
  endDate: string = '';



  private app = inject(AppComponent);

  constructor(private spotifyService: SpotifyApiService) {}

  performSearch(query: string) {
    this.spotifyService.searchTracks(query).subscribe({
      next: (data) => {
        this.allTracks = data.tracks.items;

        this.albums = Array.from(new Set(this.allTracks.map((item: any) => item.album.name)));
        this.genres = Array.from(
          new Set(
            this.allTracks.flatMap((item: any) => item || [])
          )
        );

        console.log(this.genres);


        this.filteredTrack = this.allTracks;

        this.selectedAlbum = '';
        this.selectedGenre = '';
        this.selectedTrack = null;
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          this.app.redirectToAuth();
        } else {
          console.error('Error while searching on Spotify', err);
        }
      }
    });
  }

  onSearchClick() {
    const query = this.searchControl.value;
    if (query && query.trim().length > 0) {
      this.performSearch(query.trim());
    }
  }

  onTrackSelected(track: any) {
    this.selectedTrack = track;
  }

  onAlbumSelected() {
    if (this.selectedAlbum) {
      this.filteredTrack = this.allTracks.filter(
        (item: any) => item.album.name === this.selectedAlbum
      );
    } else {
      this.filteredTrack = this.allTracks;
    }
  }

  showFilters = false;

  onFiltersShow() {
    this.showFilters = !this.showFilters;
  }

  onDateFilterChanged() {
    this.filteredTrack = this.allTracks.filter(track => {
      const releaseDate = track.album && track.album.release_date;
      if (!releaseDate)
        return false;

      const trackDate = new Date(releaseDate);
      let startDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);

      return trackDate >= startDate && trackDate <= endDate;
    });
  }




}
