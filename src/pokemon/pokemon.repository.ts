import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class PokemonRepository {
  constructor(private readonly httpService: HttpService) {}

  getPokemonByName(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => response.data),
      catchError(() => {
        throw new Error('Unable to fetch Pokemon data');
      }),
    );
  }
}
