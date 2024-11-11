import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { PokemonRepository } from './pokemon.repository';

@Module({
  imports: [HttpModule],
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
