import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { IHttpResponse } from 'src/common/utils/resposne.utils';
import { PokemonService } from './pokemon.service';
import { IPokemonBaseController } from 'src/common/interfaces/base/base.pokemon.interface.controller';
import { JwtAuthGuard } from 'src/common/auth/strategy/jwtAuth.guard';
import { PokemonSearchDto } from 'src/common/interfaces/pokemon/pokemon.dto';

@Controller('api/v1/pokemon')
export class PokemonController implements IPokemonBaseController {
  constructor(
    @Inject('IPokemonBaseService')
    private readonly pokemonService: PokemonService,
  ) {}

  @Get('random')
  @UseGuards(JwtAuthGuard)
  async getPokemonRandom(): Promise<IHttpResponse> {
    const pokemon = await this.pokemonService.getPokemonRandom();
    return pokemon;
  }

  @Get(':pokemon')
  @UseGuards(JwtAuthGuard)
  async getPokemonByName(
    @Param() param: PokemonSearchDto,
  ): Promise<IHttpResponse> {
    const pokemon = await this.pokemonService.getPokemonByName(param.pokemon);
    return pokemon;
  }

  @Get(':pokemon/ability')
  @UseGuards(JwtAuthGuard)
  async getPokemonAbilityByName(
    @Param() param: PokemonSearchDto,
  ): Promise<IHttpResponse> {
    const pokemon = await this.pokemonService.getPokemonAbilityByName(
      param.pokemon,
    );
    return pokemon;
  }
}
