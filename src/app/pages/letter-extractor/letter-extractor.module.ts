import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LetterExtractorComponent } from './letter-extractor.component';
import { Actions } from '../../../actions';

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
    ],
    declarations: [LetterExtractorComponent],
    providers: [Actions]
})
export class LetterExtractorModule {}
