import  {test as base}  from '@playwright/test';
import { ToolShopAPI } from './api/ToolShopAPI';

interface Fixtures {
    api: ToolShopAPI;
}

export const test = base.extend<Fixtures>({
    api: async ({ request }, use) => {
        const api = new ToolShopAPI(request);
        await use(api);
    }
});

export  {expect} from '@playwright/test';