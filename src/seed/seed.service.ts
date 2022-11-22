import { PokeResponse } from './interfaces/poke-api-response.interface';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/adapters/axios-adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly axios: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const resp = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=200',
    );
    const seedData = resp.results.map((pokemon) => {
      const segments = pokemon.url.split('/');
      const no = +segments[segments.length - 2];
      return { name: pokemon.name, no };
    });
    await this.pokemonModel.insertMany(seedData);
    return seedData;
  }
}
