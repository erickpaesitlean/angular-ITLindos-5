import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadNav } from "./components/master/head-nav/head-nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('empresaAngular');
}
