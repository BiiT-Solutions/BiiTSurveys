import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MultiSurveyBoardComponent} from "./multi-survey-board.component";

const routes: Routes = [
    {
        path: '',
        component: MultiSurveyBoardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MultiSurveyBoardRoutingModule { }
