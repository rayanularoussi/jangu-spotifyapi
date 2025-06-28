import { Component, Input} from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-music-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './music-details.component.html',
  styleUrl: './music-details.component.css'
})

export class MusicDetailsComponent {

  @Input() track: any = null;

  durationConverter(ms: number): string {
    const total = Math.floor(ms / 1000);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

}
