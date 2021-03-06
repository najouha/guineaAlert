import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserSettings } from '../../../../models/user-settings';
import { SettingsService } from '../../../../services/settings.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pac-list',
  templateUrl: './pac-list.page.html',
  styleUrls: ['./pac-list.page.scss'],
})
export class PacListPage implements OnInit, OnDestroy {
    // VARIABLES +  CONSTR + INIT -------------------------------------------------------------------------------------------------------
    user: {};
    userSetSubscription: Subscription;

    constructor(private settingService: SettingsService,
                private toastController: ToastController,
                private router: Router) { }

    ngOnInit() {
        this.userSetSubscription = this.settingService.userSettingSubject.subscribe(
            (userSet: UserSettings) => {
                this.user = userSet.data;
            },
            (error) => {
                console.log(error);
                this.displayFlash('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter', 'redFlashMessage');
            }
        );
        this.settingService.emitUserSetSubject();
    }

    ngOnDestroy() {
        this.userSetSubscription.unsubscribe();
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES -------------------------------------------------------------------------------------------------------------------------
    // Supprime un PAC
    deletePAC(pacPseudo: string, index: string) {
        this.settingService.deletePAC(+index).then(() => {
            this.displayFlash(pacPseudo + ' a bien été supprimé(e)', 'greenFlashMessage');
        });
    }
    // Ajoute un PAC si le nombre total de PAC du USer est < 3
    onAddPAC() {
        if (sessionStorage.getItem('numberOfPAC') >= '3') {
            this.displayFlash('Vous avez atteint le nombre maximum de PAC', 'redFlashMessage');
        } else {
            return this.router.navigate(['/settings/pac-list/new-pac']);
        }
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Affiche un Message flash ----------------------------------------------------------------------------------------------------------
    displayFlash(message: string, customClass: string) {
        this.toastController.create({
            message: message,
            showCloseButton: true,
            closeButtonText: 'Fermer',
            position: 'top',
            cssClass: customClass
        }).then((toast: HTMLIonToastElement) => {
            toast.present();
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
