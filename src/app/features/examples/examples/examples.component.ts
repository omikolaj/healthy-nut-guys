import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'thng-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'thng.examples.menu.todos' },
    { link: 'stock-market', label: 'thng.examples.menu.stocks' },
    { link: 'theming', label: 'thng.examples.menu.theming' },
    { link: 'crud', label: 'thng.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'thng.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'thng.examples.menu.form' },
    { link: 'notifications', label: 'thng.examples.menu.notifications' },
    { link: 'elements', label: 'thng.examples.menu.elements' },
    { link: 'authenticated', label: 'thng.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
