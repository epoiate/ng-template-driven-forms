import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { deepClone, HeroAndLikes } from '../model';
import { DataService } from '../data.service';
import { ngIfAnim } from '../animations';

@Component({
  selector: 'app-hero-form-container',
  templateUrl: './hero-form-container.component.html',
  animations: [ngIfAnim],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFormContainerComponent {
  /** Current hero graph straight from cache */
  currentHeroAndLikes$: Observable<HeroAndLikes>;
  /** Observable of the ViewModel: a reshaped, cloned, current hero data. */
  /** Index of the selected "Likes" UI implementation */
  selectedUi$: Observable<string>;
  editing = true;
  vm$: Observable<HeroAndLikes>;

  constructor(private dataService: DataService) {
    this.currentHeroAndLikes$ = this.dataService.currentHeroAndLikes$;
    this.selectedUi$ = this.dataService.selectedUi$;
    this.vm$ = this.currentHeroAndLikes$.pipe(
      map(data => deepClone(data))
    );
  }

  /** Save the changed ViewModel and close */
  save(vm: HeroAndLikes) {
    this.dataService.saveHeroAndLikes(vm);
    this.editing = false;
  }

  /** Close and discard the ViewModel (w/ or w/o changes) */
  close() {
    this.editing = false;
  }

  updateSelectedUi(selectedUi: string) {
    this.dataService.updateSelectedUi(selectedUi);
  }
}
