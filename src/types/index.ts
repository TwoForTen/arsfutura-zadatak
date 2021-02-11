export interface UserProfile {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
}

export interface TokenObj {
  access_token: string;
  expires_at: number | undefined;
  expires_in: number | undefined;
  id_token: string;
}

export interface Event {
  summary: string;
  start: Date;
  end: Date;
}
