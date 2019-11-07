import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor() { }

  set(chave, valor){
      return new Promise(async retorno => {
          let data = {
              key: chave,
              value: JSON.stringify(valor)
          }
          await Storage.set(data)

          retorno(data)
      })
  }

  get(chave){
      return new Promise(async retorno => {
          let data = await Storage.get({key: chave})
          retorno(JSON.parse(data.value))
      })
  }
}
