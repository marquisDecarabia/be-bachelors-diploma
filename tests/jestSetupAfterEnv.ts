import { Test, TestingModuleBuilder, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionInterceptor } from '@src/infrastructure/interceptors/exception.interceptor';

export class TestServer {
  constructor(
    public readonly serverApplication: NestExpressApplication,
    public readonly testingModule: TestingModule,
  ) {}

  public static async new(
    testingModuleBuilder: TestingModuleBuilder,
  ): Promise<TestServer> {
    const testingModule: TestingModule = await testingModuleBuilder.compile();

    const serverApplication: NestExpressApplication =
      testingModule.createNestApplication();
    serverApplication.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    serverApplication.useGlobalInterceptors(new ExceptionInterceptor());
    await serverApplication.init();

    return new TestServer(serverApplication, testingModule);
  }
}

export async function generateTestingApplication(): Promise<{
  testServer: TestServer;
  // api: ApiClient;
}> {
  const testServer = await TestServer.new(
    Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }),
  );

  return {
    testServer,
  };
}

let testServer: TestServer;

export function getTestServer(): TestServer {
  return testServer;
}

beforeAll(async (): Promise<void> => {
  ({ testServer } = await generateTestingApplication());
});
