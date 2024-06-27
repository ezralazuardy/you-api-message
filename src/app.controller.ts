import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MessageDto } from './dtos/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Welcome to the RabbitMQ Consumer for You App RESTful API! - made by @ezralazuardy.';
  }

  @EventPattern('message_sent')
  async handleUserMessage(@Payload() messageDto: MessageDto) {
    await this.appService.persistUserMessage(messageDto);
  }
}
