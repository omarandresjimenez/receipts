export interface Recipe {
  id: string;
  name: string;
  description: string;
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
  idState: string;
}

export interface State {
  id: string;
  name: string;
}
