import bcrypt from 'bcrypt';

export class User {
  constructor(
    public readonly email: string,
    public password: string,
    public readonly name: string,
    public readonly career: string,
    public readonly semester: number,
    public readonly id?: number
  ) {}

  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}