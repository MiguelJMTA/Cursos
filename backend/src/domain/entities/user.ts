
export class User {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly career: string,
    public readonly semester: number,
    public readonly id?: number
  ) {}

 
}