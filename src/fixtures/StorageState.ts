export class StorageState {
  private baseURL: string;
  private state: State;
  constructor(url: string) {
    this.baseURL = url;
    this.state = {
      cookies: [
        {
          sameSite: 'None',
          name: 'JOHNLEWIS_ENSIGHTEN_PRIVACY_BANNER_VIEWED',
          value: '1',
          url: this.baseURL,
          expires: 1893488400,
        },
        {
          sameSite: 'None',
          name: 'JOHNLEWIS_ENSIGHTEN_PRIVACY_Advertising',
          value: '1',
          url: this.baseURL,
          expires: 1893488400,
        },
        {
          sameSite: 'None',
          name: 'JOHNLEWIS_ENSIGHTEN_PRIVACY_Analytics',
          value: '1',
          url: this.baseURL,
          expires: 1893488400,
        },
        {
          sameSite: 'None',
          name: 'JOHNLEWIS_ENSIGHTEN_PRIVACY_Essentials',
          value: '1',
          url: this.baseURL,
          expires: 1893488400,
        },
        {
          sameSite: 'None',
          name: 'JOHNLEWIS_ENSIGHTEN_PRIVACY_Functional',
          value: '1',
          url: this.baseURL,
          expires: 1893488400,
        },
        {
          sameSite: 'None',
          name: 'JOHNLEWIS_ENSIGHTEN_PRIVACY_Personalisation',
          value: '1',
          url: this.baseURL,
          expires: 1893488400,
        },
      ],
    };
  }

  public get getState(): any {
    return this.state;
  }
}

type Cookie = {
  sameSite: string;
  name: string;
  value: string;
  url: string;
  expires: number;
};

type State = {
  cookies: Cookie[];
};
