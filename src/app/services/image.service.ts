import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Image} from '../models/image';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getImages(): Observable<any> {
    return this.http.get('http://angularbook.app/api/v1/images')
      .map((response) => response);
  }

  addImage(image: Object): Observable<Image[]> {
    return this.http.post('http://angularbook.app/api/v1/images', image)
      .map((response) => response)
      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'} ));
  }

  getImage(id: String): Observable<any> {
    return this.http.get('http://angularbook.app/api/v1/images/' + id)
      .map((response) => response);
  }

  updateImage(image: Object): Observable<Image[]> {
    const apiUrl = 'http://angularbook.app/api/v1/images';
    const url = `${apiUrl}/${image['id']}`;
    return this.http.put(url, image)
      .map((response) => response)
      .catch((error: any) => Observable.throw(error.error || {message: 'Server Error'}));
  }

  deleteImage(id: String): Observable<Image[]> {
    const apiUrl = 'http://angularbook.app/api/v1/images';
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url)
      .map((response) => response)
      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
  }
}
