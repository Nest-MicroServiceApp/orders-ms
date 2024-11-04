import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm';


@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite que ConfigService esté disponible globalmente
      load: [typeormConfig], // Carga la configuración de TypeORM
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'), // Obtiene la configuración de TypeORM
    }),
    OrdersModule
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
