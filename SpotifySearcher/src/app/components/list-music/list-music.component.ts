import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-music.component.html',
  styleUrl: './list-music.component.css'
})
export class ListMusicComponent {
  @Input() results: any[] = [];
  @Output() selectTrack = new EventEmitter<any>();

  handleClick(track: any) {
    this.selectTrack.emit(track);
  }
}
