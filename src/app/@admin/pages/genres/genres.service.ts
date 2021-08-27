import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ADD_GENRE, BLOCK_GENRE, DELETE_GENRE, MODIFY_GENRE } from '@graphql/operations/mutation/genre';
import { GENRE_INFO } from '../../../@graphql/operations/query/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends ApiService {

  constructor(apollo:Apollo) {
    super(apollo)
   }

  public add(genre:string) {
    return this.set(ADD_GENRE,{genre}, {}).pipe(map((result:any)=>{
      return result.addGenre
    }))
  }

  public update(genre:string, id: string) {
    return this.set(MODIFY_GENRE,{genre, id}, {}).pipe(map((result:any)=>{
      return result.updateGenre
    }))
  }

  public delete(id: string) {
    return this.set(DELETE_GENRE,{id}, {}).pipe(map((result:any)=>{
      return result.deleteGenre
    }))
  }

  public info(id: string) {
    return this.get(GENRE_INFO,{id}, {}).pipe(map((result:any)=>{
      return result.deleteGenre
    }))
  }

  public block(id: string) {
    return this.set(BLOCK_GENRE,{id}, {}).pipe(map((result:any)=>{
      return result.blockGenre
    }))
  }
}
