import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, first, map } from 'rxjs/operators';

import { Data, Hero, HeroAndLikes, powers } from './model';

/** Data access facade over ngrx-like observable store. */
@Injectable({ providedIn: 'root' })
export class DataService {
  /** Client-side store (in the manner of NgRx) */
  private readonly cache = new BehaviorSubject<Data>(createDemoData());

  /** Observable of cached application data (the observable store) */
  readonly cache$ = this.cache.asObservable();

  /** Observable of the current hero (id: currentHeroId) and that hero's likes. */
  readonly currentHeroAndLikes$: Observable<HeroAndLikes> = this.cache.pipe(
    // When heroes or likes change ...
    distinctUntilChanged(
      (prevCache, currCache) => 
      prevCache.heroes === currCache.heroes && 
      prevCache.likes === currCache.likes &&
      prevCache.currentHeroId === currCache.currentHeroId
    ),

    // Select current hero and its likes
    map((cache) => ({
      hero: cache.heroes.find((hero) => hero.id === cache.currentHeroId),
      likes: cache.likes.filter((like) => like.heroId === cache.currentHeroId),
    }))
  );

  /** Return cached data at the moment of this method's execution.
   * Convenience method for internal service use only. */
  private cacheNow() {
    // This technique relies on synchronous nature of cache$.
    let cache: Data;
    this.cache$.pipe(first()).subscribe((c) => (cache = c));
    return cache;
  }

  /** Observable index of the currently selected "Likes" form implementation. */
  readonly selectedUi$ = this.cache$.pipe(
    distinctUntilChanged((p, c) => p.selectedUi === c.selectedUi),
    map((d) => d.selectedUi)
  );

  saveHeroAndLikes({ hero, likes: heroLikes = [] }: HeroAndLikes) {
    const cache = this.cacheNow();
    let { heroes, likes } = cache;

    let currentHeroId = hero.id;
    if (currentHeroId > 0) {
      // Update existing hero
      heroes = heroes.map((h) => (h.id === currentHeroId ? hero : h));
      likes = likes
        .filter((l) => l.heroId !== currentHeroId)
        .concat(
          heroLikes.map((l) => (l.id > 0 ? l : { ...l, id: idCounter++ }))
        );
    } else {
      // Add a new hero
      currentHeroId = idCounter++;
      hero.id = currentHeroId;
      heroLikes = heroLikes.map((l) => ({
        ...l,
        id: idCounter++,
        currentHeroId,
      }));
      currentHeroId = currentHeroId;
      heroes = heroes.concat(hero);
      likes = likes.concat(heroLikes);
    }
    this.cache.next({ ...cache, currentHeroId, heroes, likes });
  }

  updateCurrentHeroId(currentHeroId: number) {
    this.cache.next({ ...this.cacheNow(), currentHeroId });
  }

  updateSelectedUi(selectedUi: string) {
    this.cache.next({ ...this.cacheNow(), selectedUi });
  }
}

/** Next available id for a Hero or Like */
let idCounter = 18;

/** return a newly created data for the demo */
function createDemoData(): Data {
  const pow = powers.find((p) => p.qualifiers.length > 1);
  const heroId = idCounter++;
  const hero: Hero = {
    id: heroId,
    name: 'Dr IQ',
    alterEgo: 'Chuck Overstreet',
    power: pow.name,
    powerQualifier: pow.qualifiers[1],
  };

  return {
    currentHeroId: heroId,
    heroes: [hero],
    likes: [
      { id: idCounter++, heroId, name: 'fruit' },
      { id: idCounter++, heroId, name: 'bread' },
      { id: idCounter++, heroId, name: 'hamburger' },
    ],
    selectedUi: '0',
  };
}
