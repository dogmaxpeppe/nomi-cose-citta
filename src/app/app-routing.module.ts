import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'start',
        loadChildren: () => import('./pages/letter-extractor/letter-extractor.module').then(m => m.LetterExtractorModule)
    },
    {
        path: 'list',
        loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
    },
    {
        path: 'ranking',
        loadChildren: './pages/ranking/ranking.module#RankingPageModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
