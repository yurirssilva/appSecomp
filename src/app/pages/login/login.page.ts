import { BancoService } from './../../services/banco.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    usuario = {
        email: '',
        password: ''
    }
    usuarioLogado = false
    constructor(
        private banco: BancoService,
        public alertCtrl: AlertController
    ) { }

    async ngOnInit() {
        this.buscarUsuario()
    }

    async logar() {
        let usuarioBanco = await this.banco.set('usuario', this.usuario)
        console.log('usuario ==> ', this.usuario)
        console.log('usuarioBanco ==> ', usuarioBanco)
        this.buscarUsuario()
    }

    async sair() {
        let alerta = await this.alertCtrl.create({
            message: "Deseja sair?",
            buttons: [{
                text: "Não"
            }, {
                text: "Sim",
                handler: async () => {
                    await this.banco.remove('usuario')
                    this.buscarUsuario()
                }
            }]
        })
        alerta.present()
    }

    async buscarUsuario() {
        let usuario = await <any>this.banco.get('usuario')
        if (usuario) {
            this.usuario = usuario
            this.usuarioLogado = true
        } else {
            this.usuario = {
                email: '',
                password: ''
            }
            this.usuarioLogado = false
        }
    }
}
