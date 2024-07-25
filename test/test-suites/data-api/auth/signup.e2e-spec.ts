import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';

import {
  createTestingApp,
  startTestingApp,
  stopTestingApp,
} from '@test/utils/create-testing-app.utils';
import { AuthDataApiModule } from '~data-api/auth/auth.data-api.module';
import { EmailInUseUserError } from '~domain/user/user.error';
import { IUserRepository } from '~domain/user/user.repository';

import { INPUT_VALIDATION_ERROR } from '~common/error/validation.error';
import { API_V1_PATH } from '~common/http/http.constant';
import { USER_DB_REPOSITORY } from '~db/db.module';

describe('signup', () => {
  let testingApp: INestApplication;
  let userRepository: IUserRepository;

  beforeAll(async () => {
    const module = await createTestingApp({ imports: [AuthDataApiModule] });
    testingApp = await startTestingApp(module);
    userRepository = testingApp.get<IUserRepository>(USER_DB_REPOSITORY);
  });

  afterAll(async () => {
    await stopTestingApp(testingApp);
  });

  test.each`
    caseDesc                                    | payload
    ${'no payload'}                             | ${{}}
    ${'firstName not string'}                   | ${{ firstName: 123 }}
    ${'firstName empty'}                        | ${{ firstName: '' }}
    ${'lastName not string'}                    | ${{ lastName: 123 }}
    ${'lastName empty'}                         | ${{ lastName: '' }}
    ${'phoneNumber not phoneNumber(US) string'} | ${{ phoneNumber: '123' }}
    ${'email not string'}                       | ${{ email: 123 }}
    ${'email empty'}                            | ${{ email: '' }}
    ${'password not string'}                    | ${{ password: 123 }}
    ${'password empty'}                         | ${{ password: '' }}
  `(
    'should not signup user - input validation error - $caseDesc',
    async ({ caseDesc, payload }) => {
      const response = await request(testingApp.getHttpServer())
        .post(`/${API_V1_PATH}/auth/signup`)
        .send(payload);

      expect(response.body.details.errors).toBeDefined();

      if (caseDesc === 'no payload') {
        expect(response.body.details.errors.length).toBe(4);
      }

      expect(response.body.code).toBe(INPUT_VALIDATION_ERROR);
      expect(response.statusCode).toBe(400);
    },
  );

  it('should signup a user', async () => {
    const newUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: 'example@gmail.com',
      password: faker.internet.password(),
    };

    const response = await request(testingApp.getHttpServer())
      .post(`/${API_V1_PATH}/auth/signup`)
      .send(newUser);

    const createdUser = await userRepository.getByEmail(newUser.email);

    expect(createdUser.id).toBeDefined();
    expect(response.statusCode).toBe(201);
  });

  it('should not signup user - user error - email in use', async () => {
    const newUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: 'example@gmail.com',
      password: faker.internet.password(),
    };

    const response = await request(testingApp.getHttpServer())
      .post(`/${API_V1_PATH}/auth/signup`)
      .send(newUser);

    expect(response.body.code).toBe(EmailInUseUserError.name);
    expect(response.statusCode).toBe(409);
  });
});
