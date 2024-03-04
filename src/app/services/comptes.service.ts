import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';

const url = `${GlobalComponent.API_URL}/comptes`


@Injectable({
  providedIn: 'root'
})

export class ComptesService {

  constructor() { }

  
}
