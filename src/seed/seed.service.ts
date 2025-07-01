import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class SeedService {
private url:string ="https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
private readonly axios: AxiosInstance= axios

constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon> ){

}

async  executeSeed() {    
  await this.pokemonModel.deleteMany({});

   const {data}= await this.axios.get<PokeResponse>(this.url)
   const pokemonToInsert:{name:string,no:number} []= [];

   data.results.forEach(async ({name,url}) => {
    let  segements = url.split("/")
    let no:number = +segements[segements.length-2]

    pokemonToInsert.push({name,no})

   })

   await this.pokemonModel.insertMany(pokemonToInsert);

   return`Seed Executed` 
  }
}
