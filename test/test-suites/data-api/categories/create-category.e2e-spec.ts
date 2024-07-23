import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import {
  createTestingApp,
  startTestingApp,
  stopTestingApp,
} from '@test/utils/create-testing-app.utils';

import { CategoriesDataApiModule } from '~data-api/categories/categories.data-api.module';
import { API_V1_PATH } from '~common/http/http.constant';
import { INPUT_VALIDATION_ERROR } from '~common/error/validation.error';

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

  test.each`
    caseDesc             | payload
    ${'no payload'}      | ${{}}
    ${'name not string'} | ${{ name: 123 }}
    ${'name empty'}      | ${{ name: '' }}
  `(
    'should not create category - input validation error - $caseDesc',
    async ({ caseDesc, payload }) => {
      const response = await request(app.getHttpServer())
        .post(`/${API_V1_PATH}/categories`)
        .send(payload);

      expect(response.body.details.errors).toBeDefined();

      if (caseDesc === 'no payload') {
        expect(response.body.details.errors.length).toBe(1);
      }

      expect(response.body.code).toBe(INPUT_VALIDATION_ERROR);
      expect(response.statusCode).toBe(400);
    },
  );
});
