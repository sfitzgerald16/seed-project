export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string) {}
}

// ? means it is optional
