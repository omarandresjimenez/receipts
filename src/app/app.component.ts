import { Component, HostListener } from '@angular/core';
import { UserSessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private service: UserSessionService) {}

  @HostListener('window:click', ['$event'])
  clickApp(event: MouseEvent) {
    this.service.resstartTimeOut();
  }

  @HostListener('window:scroll', [])
   onWindowScroll() {
    this.service.resstartTimeOut();
  }

}
