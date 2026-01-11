import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [LoggerModule, ChatModule],
})
export class AppModule {}
