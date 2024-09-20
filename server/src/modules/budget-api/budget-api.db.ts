import { createPool, Pool } from 'mysql';

export class BudgetApiDbService {
  private _pool: Pool;

  public connect(): void {
    this._pool = createPool({
      host: process.env.BUDGET_API_DB_HOST,
      port: parseInt(process.env.BUDGET_API_DB_PORT),
      user: process.env.BUDGET_API_DB_USERNAME,
      password: process.env.BUDGET_API_DB_PASSWORD,
      database: process.env.BUDGET_API_DB_NAME,
    });
  }

  public async executeQuery(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public disconnect(): void {
    this._pool.end((error: any) => {
      if (error) {
        console.error('Error closing database connection:', error);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
}
