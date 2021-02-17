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
  id_token: string;
}

export interface Event {
  id: string;
  summary: string;
  start: Date;
  end: Date;
}

export interface GroupedEvents {
  [date: string]: Event[];
}
