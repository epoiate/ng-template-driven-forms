export interface Hero {
  id: number;
  name: string;

  /** Hero's secret identity */
  alterEgo?: string;

  /** Hero's distinctive super power */
  power: string;

  /** How strong is the hero's power */
  powerQualifier?: string;
}

const example: Hero = {
  id: 2,
  name: 'Dr IQ',
  alterEgo: 'Chuck Overstreet',
  power: 'Really Smart',
  powerQualifier: 'Genius',
};
