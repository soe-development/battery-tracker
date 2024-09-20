import { Injectable } from '@nestjs/common';
import * as ldap from 'ldapjs';
import { MSSQLService } from '../ms-sql/ms-sql.service';

@Injectable()
export class ActiveDirectoryService {
  private ldapUrl: string = 'ldap://10.109.78.98';
  private username: string;
  private password: string;
  private email: string;
  private client: any;

  createClient() {
    this.client = ldap.createClient({
      url: this.ldapUrl,
    });
  }

  setCredentials(username: string, password: string) {
    this.username = username;
    this.password = password;

    this.email = this.username.includes('@')
      ? this.username.substring(0, this.username.indexOf('@')) + '@soe.com.ua'
      : this.username + '@soe.com.ua';

    this.createClient();
  }

  private attemptBind(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.bind(username, this.password, (error: any) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }

  async bind() {
    const bindAttempts = [
      { username: this.username, message: 'Initial' },
      {
        username: this.username.includes('@')
          ? this.username.substring(0, this.username.indexOf('@')) + '@soe'
          : this.username + '@soe',
        message: 'Modified',
      },
    ];

    for (const attempt of bindAttempts) {
      try {
        await this.attemptBind(attempt.username);
        return true;
      } catch (error) {}
    }

    console.error('Both bind attempts failed');
    return false;
  }

  async getUser() {
    try {
      if (await this.bind()) {
        const mssql = new MSSQLService();
        const user = await mssql.getUser(this.email);

        this.unbind();
        return user;
      } else return false;
    } catch (error) {
      this.unbind();
      return false;
    }
  }

  unbind() {
    this.client.unbind((unbindError: any) => {
      if (unbindError) {
        console.error('Error:', unbindError);
      } else {
        console.log('Connection closed');
      }
    });

    this.client.closed;
  }
}
