import { IHttpResponse } from 'src/common/utils/resposne.utils';
import { PokemonSearchDto } from '../pokemon/pokemon.dto';

export interface IPokemonBaseController {
  getPokemonRandom(): Promise<IHttpResponse>;
  getPokemonByName(param: PokemonSearchDto): Promise<IHttpResponse>;
  getPokemonAbilityByName(param: PokemonSearchDto): Promise<IHttpResponse>;
}
