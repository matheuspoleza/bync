import { AuthTokens } from './types/auth';
import { RequestInit } from 'node-fetch';

export class BaseMobilisAPI {
  static BASE_URL = 'https://api.mobills.com.br/webcore/api';
  private headers: Record<string, string>;
  public authToken: AuthTokens;

  constructor(apiVersion?: string) {
    this.headers = {
      'Content-Type': 'application/json',
    };

    if (apiVersion) {
      this.headers['X-Api-Version'] = apiVersion;
    }
  }

  private async getFetch() {
    const { default: fetch } = await import('node-fetch');
    return fetch;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
  ): Promise<T> {
    const fetch = await this.getFetch();

    if (this.authToken) {
      this.headers['Authorization'] = `Bearer ${this.authToken.accessToken}`;
    }

    const options: RequestInit = {
      method: method,
      headers: this.headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(
        `${BaseMobilisAPI.BASE_URL}${endpoint}`,
        options,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint);
  }

  public post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  }

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }

  public setHeaders(headers: Record<string, string>): void {
    this.headers = headers;
  }

  public addHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  public updateToken(data: AuthTokens) {
    this.authToken = data;
  }
}
