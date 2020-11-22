import { UserModel } from './UserModel';

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  city?: City;
  rating?: number;
  preparations?: Preparation[];
}

export interface Preparation {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  active: boolean;
  ingredients?: Ingredient[];
  preparationType?: string;
  tools?: Tool[];
  city?: City;
  user: UserModel;
  author?: UserModel;
  recipe?: Recipe;
  rating?: number;
  userName?: string;
  recipeName?: string;
  cookingTechnique?: CookingTechnique;
  source?: string;
  carrierCommunity?: string;
  forSale?: boolean;
  preparationSteps?: string;
  region?: Region;
  creationDate?: string;

}

export interface Ingredient {
  id: string;
  name: string;
}

export interface CookingTechnique {
  id: string;
  name: string;
  description?: string;
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

export interface Story {
  name: string;
  description: string;
  content: string;
}
