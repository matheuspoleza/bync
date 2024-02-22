import puppeteer, { HTTPRequest, Page, Browser } from 'puppeteer';
import { AuthTokens } from './types/auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MobilisWeb {
  static BASE_URL = 'https://api.mobills.com.br';

  private page: Page;
  private authToken: AuthTokens;

  constructor(private configService: ConfigService) {}

  private async setupDriver() {
    const browser: Browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      dumpio: true, // Enable logging
    });
    this.page = await browser.newPage();
  }

  private captureAuthToken() {
    this.page.on('requestfinished', async (request: HTTPRequest) => {
      // Ignora requisições preflight
      if (request.method() === 'OPTIONS') {
        return;
      }

      if (
        request.url() ===
        `${MobilisWeb.BASE_URL}/auth/api/Auth/signin/email-password`
      ) {
        const response = await request.response();

        if (
          response &&
          !(response.status() >= 300 && response.status() < 400)
        ) {
          try {
            const responseBody = await response.json();
            const accessToken = responseBody.accessToken;
            const expiresIn = responseBody.expiresIn;

            const tokenInfo = {
              accessToken,
              refreshToken: responseBody.refreshToken,
              expiresIn,
            };

            this.authToken = tokenInfo;
          } catch (error) {
            console.error('Erro ao analisar a resposta:', error);
          }
        }
      }
    });
  }

  private async login() {
    await this.page.goto('https://web.mobills.com.br/auth/login', {
      waitUntil: 'networkidle0',
    });

    const email = this.configService.get<string>('MOBILIS_USERNAME');
    const password = this.configService.get<string>('MOBILIS_ACCESS_TOKEN');

    // Fill in the email input
    await this.page.type('input[name="email"]', email);

    // Fill in the password input
    await this.page.type('input[name="password"]', password);

    // Click the submit button
    await this.page.click('button[type="submit"]');
  }

  private async goToDashboard() {
    await this.page.waitForXPath("//*[contains(text(), 'Dashboard')]", {
      visible: true,
    });
  }

  public async runInBrowser<T = unknown>(
    action: (context: { token: AuthTokens; page: Page }) => Promise<T>,
  ): Promise<T> {
    await this.setupDriver();
    this.captureAuthToken();

    await this.login();
    await this.goToDashboard();

    const data = await action({ token: this.authToken, page: this.page });

    await this.page.browser().close();

    return data as T;
  }
}
