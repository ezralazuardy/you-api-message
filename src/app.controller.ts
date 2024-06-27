import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MessageDto } from './dtos/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('message_sent')
  async handleUserMessage(@Payload() messageDto: MessageDto) {
    await this.appService.persistUserMessage(messageDto);
  }
}
