import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';

import { LetterExtractorComponent } from './letter-extractor.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: LetterExtractorComponent
            }
        ]),
        CountdownModule
    ],
    declarations: [LetterExtractorComponent]
})
export class LetterExtractorModule {}
