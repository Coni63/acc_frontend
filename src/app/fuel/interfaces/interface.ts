export interface Car {
  id: number;
  name: string;
  brand: string;
}

export interface Track {
  id: number;
  name: string;
  country: string;
  distance: number;
  turns: number;
  lap_time: number;
}

export interface Consumption {
  track: string;
  car: string;
  fuel: number;
}

export interface Result {
  lap: number;
  time_elapsed: string;
  time_remaining: string;
  fuel_remaining: string;
}