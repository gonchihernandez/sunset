import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';


async function bootstrap() {
  // Load environment variables from .env file
  config();

  const app = await NestFactory.create(AppModule);

  // // This is a NodeJS-specific requirement - browsers implementations should omit this line.
  // GRPCWeb.setDefaultTransport(NodeHttpTransport());

  // // Authenticate using your API key, don't commit your key to a public repository!
  // const metadata = new GRPCWeb.Metadata();
  // metadata.set('Authorization', 'Bearer ' + process.env.STABILITY_AI_API_KEY);

  // // Create a generation client to use with all future requests
  // const client = new GenerationServiceClient('https://grpc.stability.ai');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('sunset')
    .setDescription('A sunset with CRUD functionality')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
