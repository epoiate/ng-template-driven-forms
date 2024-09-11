import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-edit-name-simple-rf',
  template: `<input [formControl]="nameControl" (input)="onInput()" required>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEditNameSimpleRFComponent implements OnInit {
  @Input() hero;

  nameControl: FormControl;

  ngOnInit() {
    /** Copies data value into the control */
    this.nameControl = new FormControl(this.hero.name);
  }

  onInput() {
    /** Copies current value from control back into the data */
    this.hero.name = this.nameControl.value;
  }
}
