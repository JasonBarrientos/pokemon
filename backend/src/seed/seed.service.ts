import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {
private url:string ="https://pokeapi.co/api/v2/pokemon?limit=100"

constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>, private readonly http: AxiosAdapter){

}

async  executeSeed() {    
  await this.pokemonModel.deleteMany({});

   const data= await this.http.get<PokeResponse>(this.url)
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
