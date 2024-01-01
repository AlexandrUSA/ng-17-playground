import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './layout-app.component.html',
  styleUrl: './layout-app.component.scss',
})
export class LayoutAppComponent {}
