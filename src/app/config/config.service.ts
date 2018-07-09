import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {

  configUrl = 'assets/config.json';


  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  } 


  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, {observe: 'response'}  // Now HttpClient.get() returns an Observable of typed HttpResponse rather than just the JSON data.
    )

  }
}

/**
 * The HttpClient.get() method parsed the JSON server response into the anonymous Object type. It doesn't know what the shape of that object is.
 * You can tell HttpClient the type of the response to make consuming the output easier and more obvious.
 */
export interface Config {
  heroesUrl: string;
  textfile: string;
}
