import { IHttpResponse } from 'src/common/utils/resposne.utils';

export interface IPokemonBaseService {
  getPokemonByName(name: string): Promise<IHttpResponse>;
}
