import { UserModel } from './UserModel';

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
  city?: City;
  rating?: number;
  preparations?: Preparation[];
}

export interface Preparation {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  active: boolean;
  ingredients?: Ingredient[];
  cookingTechnique?: string;
  preparationType?: string;
  tools?: Tool[];
  region?: Region;
  user: UserModel;
  author?: UserModel;
  recipe?: Recipe;
  rating?: number;
  userName?: string;
  recipeName?: string;
}

export interface Ingredient {
  id: string;
  name: string;
}

export interface Tool {
  id: string;
  name: string;
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

export interface Region {
  id: string;
  name: string;
}

export interface ActorType {
  id: string;
  name: string;
}


export interface ItemChip {
  id?: string;
  name: string;
  description?: string;
}