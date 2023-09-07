// define discord user model class
export class User {
  constructor(
    public id: string,
    public username: string,
    public discriminator: string,
    public avatar: string,
    public bot: boolean,
    public system: boolean,
    public mfaEnabled: boolean,
    public locale: string,
    public verified: boolean,
    public email: string,
    public flags: number,
    public premiumType: number,
    public publicFlags: number
  ) {}
  public getAvatarURL(): string {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`;
  }
  public getTag(): string {
    return `${this.username}#${this.discriminator}`;
  }
}
