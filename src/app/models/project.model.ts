import { UserProfile } from "./user.model";

export class projectData {
  id!: number;
  title !: string;
  category !: string;
  description !: string;
  goal_amount !: number;
  website_link?: string;
}
export interface Project {
  id: number;
  creator: UserProfile;
  title: string;
  category: string;
  description: string;
  goal_amount: number;
  raised_amount: number;
  website_link?: string;
  isActive: boolean;
  images?: Image[];
  commentary?: Commentary[];
  investment?: Investment[];
  [key: string]: any;
}

export interface Investment {
  id: number;
  investor: UserProfile;
  project: string;
  amount: number;
  created_at: string;
}

export interface Commentary {
  id: number;
  project: string;
  user: UserProfile;
  text: string;
  created_at: string;
  image?: string; 
}

export interface Image {
  id: number;
  project: string; 
  image: string; 
}
