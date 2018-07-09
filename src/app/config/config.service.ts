import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs/Observable';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';



@Injectable()
export class ConfigService {

  configUrl = 'assets/configX.json';


  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl)
        .pipe(
      catchError(this.handleError)
    );
;
  } 


  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, {observe: 'response'}  // Now HttpClient.get() returns an Observable of typed HttpResponse rather than just the JSON data.
    )

  }

  /** Error handling
   * Getting error details
   * Detecting that an error occurred is one thing. Interpreting that error and composing a user-friendly response is a bit more involved.
   * Two types of errors can occur. The server backend might reject the request, returning an HTTP response with a status code such as 404 or 500. These are error responses.
   * Or something could go wrong on the client-side such as a network error that prevents the request from completing successfully or an exception thrown in an RxJS operator. These errors produce JavaScript ErrorEvent objects.
   * The HttpClient captures both kinds of errors in its HttpErrorResponse and you can inspect that response to figure out what really happened.
   * Error inspection, interpretation, and resolution is something you want to do in the service, not in the component.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

/**
 * The HttpClient.get() method parsed the JSON server response into the anonymous Object type. It doesn't know what the shape of that object is.
 * You can tell HttpClient the type of the response to make consuming the output easier and more obvious.
 */
export interface Config {
  heroesUrl: string;
  textfile: string;
}

