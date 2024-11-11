import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class PokemonSearchDto {
  @IsString()
  @Matches(/^[a-z]+$/, {
    message: 'pokemon must contain only lowercase letters',
  })
  pokemon: string;
}

export class PokemonAbilityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Abilities)
  abilities: Abilities[];
}

export class Abilities {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ability)
  ability: Ability[];

  @IsBoolean()
  is_hidden: boolean;

  @IsNumber()
  slot: number;
}

export class Ability {
  @IsString()
  name: string;

  @IsString()
  @Matches(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    {
      message: 'url must be a valid URL',
    },
  )
  url: string;
}
