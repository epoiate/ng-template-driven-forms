import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-edit-name-simple-td',
  template: `<input [(ngModel)]="hero.name" required>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEditNameSimpleTDComponent {
  @Input() hero;
}
