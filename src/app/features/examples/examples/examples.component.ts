import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'hng-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'hng.examples.menu.todos' },
    { link: 'stock-market', label: 'hng.examples.menu.stocks' },
    { link: 'theming', label: 'hng.examples.menu.theming' },
    { link: 'crud', label: 'hng.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'hng.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'hng.examples.menu.form' },
    { link: 'notifications', label: 'hng.examples.menu.notifications' },
    { link: 'elements', label: 'hng.examples.menu.elements' },
    { link: 'authenticated', label: 'hng.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
