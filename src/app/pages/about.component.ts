import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageBlockComponent } from '@components/image-block/image-block.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ImageBlockComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
