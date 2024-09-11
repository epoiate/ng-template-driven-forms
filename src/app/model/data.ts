import { Hero } from './hero';
import { Like } from './like';

// Relational data model + helper props
export interface Data {
  heroes: Hero[];
  likes: Like[];

  /** currently selected Hero */
  currentHeroId: number;
  selectedUi: string;
}

// Hero "aggregate" - a parent/child model
export interface HeroAndLikes {
  hero: Hero;
  likes: Like[];
}
