import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BudgetApiDbService } from './budget-api.db';

@Injectable()
export class BudgetApiService {
  constructor(private readonly budgetApiDbService: BudgetApiDbService) {}

  async getContracts(): Promise<any> {
    this.budgetApiDbService.connect();
    const query =
      'SELECT contracts.id as contractId, contracts.number as contractNumber, contracts.term as contractDate, ' +
      'counterparties.id as counterpartyId, counterparties.name as counterpartyName ' +
      'FROM contracts_directory contracts ' +
      'LEFT JOIN counterparties_directory counterparties ON counterparties.id = contracts.counterparties_directory_id ' +
      'WHERE contracts.status = "Відкритий" ORDER BY contracts.number ASC';
    const data = await this.budgetApiDbService.executeQuery(query);

    const result = data.map((element: any) => {
      const {
        contractId,
        contractNumber,
        contractDate,
        counterpartyId,
        counterpartyName,
        ...rest
      } = element;
      return (element = {
        contractId,
        contractNumber,
        contractDate,
        counterpartyId,
        counterpartyName,
        ...rest,
      });
    });
    this.budgetApiDbService.disconnect();
    return result;
  }

  async getContractsById(id: number): Promise<any> {
    this.budgetApiDbService.connect();
    const query =
      'SELECT term as contractDate ' +
      'FROM contracts_directory ' +
      `WHERE id=${id}`;
    const data = await this.budgetApiDbService.executeQuery(query);

    const result = data.map((element: any) => {
      const { contractDate } = element;
      const date = new Date(contractDate).toISOString().split('T')[0];
      return (element = { date });
    });
    this.budgetApiDbService.disconnect();
    return result[0];
  }

  async getCounterparties(): Promise<any> {
    this.budgetApiDbService.connect();
    const query =
      'SELECT * FROM `counterparties_directory` ORDER BY `counterparties_directory`.`id` ASC';
    const data = await this.budgetApiDbService.executeQuery(query);

    const result = data.map((element: any) => {
      const { id, name } = element;
      return (element = {
        id,
        name,
      });
    });
    this.budgetApiDbService.disconnect();
    return result;
  }
}
