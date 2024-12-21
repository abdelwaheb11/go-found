export interface UserProfile {
    id: number; 
    user: User;
    desc?: string; 
    role:string;
    image?: string; 
    isActive: boolean;
    project_count?:number;
    total_investment?:number
  }
  
interface User {
    id:number;
    username:string;
    first_name:string;
    last_name:string;
    email : string
}