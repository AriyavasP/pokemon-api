import { IHttpResponse } from 'src/common/utils/resposne.utils';
import { ITokenBaseModel } from '../token/token.interface';
import { PokemonSearchDto } from '../pokemon/pokemon.dto';

export interface IPokemonBaseController {
  getPokemonByName(
    param: PokemonSearchDto,
    token: ITokenBaseModel,
  ): Promise<IHttpResponse>;

  getPokemonAbilityByName(
    param: PokemonSearchDto,
    token: ITokenBaseModel,
  ): Promise<IHttpResponse>;
}
