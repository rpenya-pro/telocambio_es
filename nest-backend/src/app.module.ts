import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadsModule } from './threads/threads.module';
import { EventsModule } from './eventos/events.module';
import { ProposalsModule } from './proposals/proposals.module';
import { OptionsMiddleware } from './options.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.production' }),
    UserModule,
    ThreadsModule,
    EventsModule,
    ProposalsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OptionsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.OPTIONS }); // Aplica a todas las rutas con método OPTIONS
  }
}
