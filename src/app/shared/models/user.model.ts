export interface User {
  uid: string;
  email: string;
  displayName?: string;

  fcmTokens?: { [token: string]: true };
}
