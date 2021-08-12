import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log('Fuck');
    }

    changeProp(ev: any) {
        // Intercept Prop ID
        const evID = ev.target.id;

        // Exec Function based on ID
        switch (evID) {
            case 'themeToggle':
                SettingsPage.toggleDarkMode(ev.detail.checked);
        }
    }

    private static toggleDarkMode(checked: boolean): void {
        document.body.classList.toggle('dark', checked);
    }
}
