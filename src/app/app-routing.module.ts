import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const singleSurveyBoardModule = import('./views/single-survey-board/single-survey-board.module').then(m => m.SingleSurveyBoardModule);
const routes: Routes = [
  {
    path: '',
    loadChildren: () => singleSurveyBoardModule
  },
  {
    path: 'nca',
    loadChildren: () => singleSurveyBoardModule
  },
  {
    path: 'multi',
    loadChildren: () => import('./views/multi-survey-board/multi-survey-board.module').then(m => m.MultiSurveyBoardModule)
  },
  {
    path: 'credibility',
    loadChildren: () => import('./views/multi-survey-board/multi-survey-board.module').then(m => m.MultiSurveyBoardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
