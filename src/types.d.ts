export interface HallOfFameMember {
  name: string;
  uuid: string;
  seasons_played: number[];
  seasons_won: number[];
  description: string;
}

export type HallOfFame = HallOfFameMember[];

export interface Season {
  season: number;
  description: string;
}

export type Seasons = Season[];
