import { IHttpResponse } from 'src/common/utils/resposne.utils';

export interface IPokemonBaseService {
  getPokemonByName(name: string): Promise<IHttpResponse>;
  getPokemonAbilityByName(name: string): Promise<IHttpResponse>;
  getPokemonRandom(): Promise<IHttpResponse>;
}
