import { Injectable } from '@nestjs/common';
import { IPokemonBaseService } from 'src/common/interfaces/base/base.pokemon.interface.service';
import { IHttpResponse, ResponseUtils } from 'src/common/utils/resposne.utils';
import { PokemonRepository } from './pokemon.repository';
import {
  Abilities,
  PokemonAbilityDto,
} from 'src/common/interfaces/pokemon/pokemon.dto';

@Injectable()
export class PokemonService implements IPokemonBaseService {
  constructor(private readonly pokenmonRepository: PokemonRepository) {}

  async getPokemonByName(name: string): Promise<IHttpResponse> {
    try {
      const pokemon = await this.pokenmonRepository
        .getPokemonByName(name)
        .toPromise();

      return ResponseUtils.Reponse(pokemon, 200);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  async getPokemonAbilityByName(name: string): Promise<IHttpResponse> {
    try {
      const pokemon = await this.pokenmonRepository
        .getPokemonByName(name)
        .toPromise();

      const abilities = new PokemonAbilityDto();
      abilities.abilities = pokemon.abilities.filter(
        (item: Abilities) => item.is_hidden === false,
      );

      return ResponseUtils.Reponse(abilities, 200);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }
}
