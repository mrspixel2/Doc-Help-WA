export interface IUser {
  id?: number;
  age?: number;
  name: string;
  lastName?: string;
  email?: string;
  docid?: string;
  password?: string;
  role?: string;
  address?: string;
  img?: string | ArrayBuffer;
  gender?: string;
  phone?: string;
  profileLink?: string;
  social?: IUserLink[];
}

export interface IUserLink {
  icon: string;
  link: string;
}
