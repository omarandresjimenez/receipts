import { Component } from '@angular/core';

import { UserSessionService } from 'src/app/core/services/session.service';

@Component({
    template: '',
})
export class LogOutComponent {
  constructor(private service: UserSessionService) {
     this.service.closeSession();
  }
}
