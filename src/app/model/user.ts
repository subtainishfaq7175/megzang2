/**
 * Created by subtainishfaq on 12/30/16.
 */
export class User {
  email: string;
  password: string;
  name: string;
  token: string;

  constructor (email: string,password : string , name? : string)
  {
    this.email=email;
    this.password=password;
    this.name=name;
  }
}
