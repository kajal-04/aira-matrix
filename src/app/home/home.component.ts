import { Component } from '@angular/core';

import { HomeFormComponent } from './home-form/home-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HomeFormComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent { }
