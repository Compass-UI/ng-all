import { Component, OnInit } from '@angular/core';
import { ConfigService, Config } from '../config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  config: Config
  headers

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    console.log('showConfigResponse:')
    this.showConfigResponse()
    console.log(this.headers);
    console.log(this.config);

  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = { /**
       * Type-checking the response
       * https://angular.io/guide/http
       * The HttpClient.get() method parsed the JSON server response into the anonymous Object type. It doesn't know what the shape of that object is.
       * You can tell HttpClient the type of the response to make consuming the output easier and more obvious.
       */...data // The callback in the updated component method receives a typed data object, which is easier and safer to consume:

          // countryUrl: data['countryUrl'],
          // textfile:  data['textfile']
      });
  }
  showConfigResponse(){
    this.configService.getConfigResponse()
      .subscribe(resp => {
        const keys = resp.headers.keys();
        console.log(keys);
        this.headers = keys.map(key => {
          `${key}: ${resp.headers.get(key)}`;
          console.log(key);
        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body }; // As you can see, the response object has a body property of the correct type.
        console.log(this.config);
        })
      })
  }

}

