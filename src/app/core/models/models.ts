export interface Recipe {
  id: string;
  name: string;
  summary: string;
  imageURL: string;
  city?: City;
  rating?: number;
  preparations?: Preparation[];
}

export interface Preparation {
  id: string;
  name: string;
  image: string;
  summary: string;
}


export interface City {
  id: string;
  name: string;
}

