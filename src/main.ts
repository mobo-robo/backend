import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";

import {
  BadRequestFilter,
  ExceptionFilter,
  ResponseTransformInterceptor,
} from "@/common";
import { RootConfig } from "@/config";
import { appFetch } from "@/utils";

import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  const config = app.get(RootConfig);
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new ResponseTransformInterceptor()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    })
  );
  app.useGlobalFilters(new ExceptionFilter(config), new BadRequestFilter());
  app.enableVersioning({ type: VersioningType.URI });

  setupSwagger(app, config);

  await app.listen(config.app.port, config.app.host, () => {
    appFetch(config);
  });
}

void bootstrap();
