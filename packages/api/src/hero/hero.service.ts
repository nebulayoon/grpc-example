import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface HeroController {
  findOne(
    data: HeroById,
    metadata?: Metadata,
    call?: ServerUnaryCall<any, any>,
  );
}

@Injectable()
export class HeroService implements OnModuleInit {
  private HeroesService: HeroController;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.HeroesService =
      this.client.getService<HeroController>('HeroesService');
  }

  async findOne() {
    return this.HeroesService.findOne({ id: 1 });
  }
}
