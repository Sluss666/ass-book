export type Roles = 'admin' | 'mod' | 'user' | 'unactive' | 'guest';

export type User = {
  _id?:string
  id?:string
  name?: string;
  surnames?: string;
  image?: string;
  user: string;
  description?: string;
  rol: Roles;
  phone?: string;
  pic?: string;
  online?:boolean;
};
