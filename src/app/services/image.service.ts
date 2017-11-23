import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getImages(): Observable<any> {
    return this.http.get('http://angularbook.app/api/v1/images')
      .map((response) => response);
  }
}
