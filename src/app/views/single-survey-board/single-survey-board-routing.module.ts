import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SingleSurveyBoardComponent} from "./single-survey-board.component";

const routes: Routes = [
    {
        path: '',
        component: SingleSurveyBoardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SingleSurveyBoardRoutingModule { }
