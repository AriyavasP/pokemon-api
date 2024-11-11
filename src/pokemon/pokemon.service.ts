import { Injectable, Inject } from '@nestjs/common';
import { IPokemonBaseService } from 'src/common/interfaces/base/base.pokemon.interface.service';
import { IHttpResponse, ResponseUtils } from 'src/common/utils/resposne.utils';
import { PokemonRepository } from './pokemon.repository';
import {
  Abilities,
  PokemonAbilityDto,
  PokemonCount,
} from 'src/common/interfaces/pokemon/pokemon.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonService implements IPokemonBaseService {
  constructor(
    private readonly pokenmonRepository: PokemonRepository,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getPokemonByName(name: string): Promise<IHttpResponse> {
    try {
      const cachedPokemon = await this.cacheManager.get<string>(name);
      if (cachedPokemon) {
        return ResponseUtils.Reponse(cachedPokemon, 200);
      }

      const pokemon = await this.pokenmonRepository
        .getPokemonByName(name)
        .toPromise();

      await this.cacheManager.set(name, pokemon);

      return ResponseUtils.Reponse(pokemon, 200);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  async getPokemonAbilityByName(name: string): Promise<IHttpResponse> {
    try {
      const cachedPokemon = await this.cacheManager.get<string>(name);
      if (cachedPokemon) {
        const abilities = this.extractAbilities(cachedPokemon);
        return ResponseUtils.Reponse(abilities, 200);
      }

      const pokemon = await this.pokenmonRepository
        .getPokemonByName(name)
        .toPromise();

      await this.cacheManager.set(name, pokemon);

      const abilities = this.extractAbilities(pokemon);
      return ResponseUtils.Reponse(abilities, 200);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  private extractAbilities(pokemon: any): PokemonAbilityDto {
    const abilities = new PokemonAbilityDto();
    abilities.abilities = pokemon.abilities.filter(
      (item: Abilities) => item.is_hidden === false,
    );
    return abilities;
  }

  async getPokemonRandom(): Promise<IHttpResponse> {
    try {
      const pokemonCount: PokemonCount = await this.pokenmonRepository
        .getPokemonByName('')
        .toPromise();

      const random = Math.floor(Math.random() * pokemonCount.count || 100) + 1;

      const pokemon: PokemonAbilityDto = await this.pokenmonRepository
        .getPokemonByName(random.toString())
        .toPromise();

      const cachedPokemon = await this.cacheManager.get<string>(pokemon.name);
      if (!cachedPokemon) {
        await this.cacheManager.set(pokemon.name, pokemon);
      }

      return ResponseUtils.Reponse(pokemon, 200);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }
}
