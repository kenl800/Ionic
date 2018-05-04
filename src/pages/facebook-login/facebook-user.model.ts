export class FacebookUserModel {
  image: string;
  gender: string;
  name: string;
  userId: string;
  friends: Array<string> = [];
  photos: Array<string> = [];
  language: Array<string> = [];
  location: Array<string> = [];
  email: string;
  birthday: string;
}
