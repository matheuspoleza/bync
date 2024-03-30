import { AuthControllerSignupRequest } from './__generated__';
import { BaseApi } from './base';

export class AuthApi extends BaseApi {
  public async signup(data: AuthControllerSignupRequest) {
    return this.auth.authControllerSignup(data);
  }

  public async login({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  public async getSession() {
    return this.supabase.auth.getSession();
  }

  public listenToAuthChanges(
    params: Parameters<typeof this.supabase.auth.onAuthStateChange>[0]
  ) {
    return this.supabase.auth.onAuthStateChange(params);
  }
}
