import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { PokemonRepository } from './pokemon.repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 1000 * 60 * 10,
      max: 100,
    }),
  ],
  controllers: [PokemonController],
  providers: [
    {
      provide: 'IPokemonBaseService',
      useClass: PokemonService,
    },
    PokemonRepository,
  ],
})
export class PokemonModule {}
