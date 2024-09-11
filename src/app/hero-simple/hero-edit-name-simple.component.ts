import { ChangeDetectionStrategy, Component } from '@angular/core';

// UNCOMMENT TAG IN app.component.html TO SEE THIS COMPONENT

@Component({
  selector: 'app-hero-edit-name-simple',
  template: `
    <h4>Simple Reactive Form</h4>

    <div class="f">
      <app-hero-edit-name-simple-rf [hero]="heroRF"></app-hero-edit-name-simple-rf>
      <i> {{heroRF.name}}</i>
    </div>

    <h4>Simple Template Driven Form</h4>

    <div class="f">
      <app-hero-edit-name-simple-td [hero]="heroTD"></app-hero-edit-name-simple-td>
      <i> {{heroTD.name}}</i>
    </div>
    <hr>
    `,
  styles: ['h4, .f {margin-bottom: 10px;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeroEditNameSimpleComponent {
  heroRF = { name: 'Johnny Reactive'}
  heroTD = { name: 'TD Jane'}
}