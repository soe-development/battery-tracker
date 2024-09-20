import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class MSSQLService {
  private config = {
    user: 'site',
    password: '5867sM393ms93in5w8',
    server: 'sql-x125',
    database: 'bar',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false,
      trustServerCertificate: false,
    },
  };

  async getUser(email: string) {
    try {
      const pool = await sql.connect(this.config);
      const result = await pool.request().query(`
        SELECT Crd.SNAME AS name, crd.email0 AS email, crd.ActiveDirLogin AS ad, CRD.SPOST AS post, sFullSubDiv AS section 
        FROM StfCrd AS Crd 
        LEFT JOIN StfListStaff AS LS ON LS.Code = Crd.LPost 
        LEFT JOIN StfSubDiv AS ssd ON ssd.CODE = Crd.PARENT  
        WHERE ISNULL(Crd.IDISMISS, 0) <> 1 AND ISNULL(Crd.DTDISMISS, 0) = 0 AND crd.email0 = '${email}'
        ORDER BY Crd.SNAME`);

      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
}
