import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { formViewProvider } from '../form-view-provider';
import { Like } from '../model';

@Component({
  selector: 'app-likes-form',
  templateUrl: './likes-form.component.html',
  viewProviders: [ formViewProvider ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikesFormComponent {
  @Input() likes: Like[];
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<Like>();
}
