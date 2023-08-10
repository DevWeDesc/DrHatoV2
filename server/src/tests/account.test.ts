import { test, expect, jest, describe } from '@jest/globals'
import { accountService } from '../services/accountService';
import { prismaMock } from '../../singleton'

describe('account services', () => {
    test('should credit with account service', async () => {
        const customerId = '1'; // Substitua pelo ID correto
        const values = 100; // Substitua pelo valor correto
        const service = await accountService.creditCustomerAccount(customerId, values); 
        
        expect(service).toContain("sucesso")

    });

});
