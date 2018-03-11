import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  artistas: any[] = []

  url_spotify:string = 'https://api.spotify.com/v1/';
  token = 'Bearer BQAyQPUjfw5ubG_hiqvdkG92XJ6Fe_BQUvTPjCu5-9_AfmKP0zVM_yQxvSv1TlGJH44u-4qSR-ylexRgaeE';

  constructor(public http:HttpClient) {
      console.log("Servicio spotify listo");
  }
  private getHeaders():HttpHeaders{
    let headers = new HttpHeaders({
      'authorization': this.token
    });
    return headers;
  }
getTop(id:string){
  let url = `${this.url_spotify}artists/${id}/top-tracks?country=ES`;

  return this.http.get(url, {headers:this.getHeaders()})
}

  getArtista(id:string){
    let url = `${this.url_spotify}artists/${id}`;

    return this.http.get(url, {headers:this.getHeaders()})
                     // .map((resp:any) => {
                     //     this.artistas = resp.artists.items;
                     //     return this.artistas;
                     // });
  }

  getArtistas(termino: string){
     let url = `${this.url_spotify}search?query=${termino}&type=artist&offset=0&limit=20`;

     let headers = this.getHeaders();

     return this.http.get(url, {headers})
                      .map((resp:any) => {
                          this.artistas = resp.artists.items;
                          return this.artistas;
                      });


  }
}
