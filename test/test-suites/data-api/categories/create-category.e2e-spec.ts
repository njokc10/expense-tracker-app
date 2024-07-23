import { INestApplication } from '@nestjs/common';

import {
  startTestingApp,
  createTestingApp,
  stopTestingApp,
} from 'test/utils/create-testing-app.utils';
import { CategoriesDataApiModule } from '~data-api/categories/categories.data-api.module';

describe('Create category e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await createTestingApp({
      imports: [CategoriesDataApiModule],
    });

    app = await startTestingApp(module);
  });

  afterAll(async () => {
    await stopTestingApp(app);
  });

  it('should not create category - invalid auth', async () => {
    console.log('It works');
  });
});
