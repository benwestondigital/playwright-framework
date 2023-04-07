export class StorageState {
  private baseURL: string;
  private state: any;
  constructor(url: string) {
    this.baseURL = url;
    this.state = {
      cookies: [
        {
          sameSite: 'Lax',
          name: 'hbi-force-control',
          value: 'true',
          url: this.baseURL,
          expires: 1893488400,
        },
      ],
      origins: [
        {
          origin: this.baseURL,
          localStorage: [],
        },
      ],
    };
  }

  public get getBaseURL(): string {
    return this.baseURL;
  }

  public get getState(): any {
    return this.state;
  }
}
