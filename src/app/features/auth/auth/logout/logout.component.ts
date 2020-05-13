import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacadeService } from '../../auth-facade.service';

@Component({
  selector: 'thng-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {
  constructor(private facade: AuthFacadeService) {}

  ngOnInit(): void {
    this.facade.logout();
  }
}
