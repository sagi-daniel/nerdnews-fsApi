export type FilterName =
  | 'ALL'
  | 'TECH'
  | 'CYBERSEC'
  | 'GAMING'
  | 'ACTION'
  | 'CRIME'
  | 'HORROR'
  | 'THRILLER'
  | 'COMEDY'
  | 'FAMILY'
  | 'DRAMA'
  | 'ANIMATION'
  | 'ADVENTURE'
  | 'SCIENCE FICTION'
  | 'FANTASY'
  | 'ROMANCE';

export interface FilterOption {
  name: FilterName;
  colorClass: string;
}
