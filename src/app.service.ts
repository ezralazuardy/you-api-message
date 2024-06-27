import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from './dtos/message.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Message.name) private readonly message: Model<Message>,
  ) {}

  async persistUserMessage(messageDto: MessageDto) {
    await this.message.create(messageDto);
  }
}
