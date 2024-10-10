import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VerticalSurveyBoardComponent} from "./vertical-survey-board.component";

const routes: Routes = [
    {
        path: '',
        component: VerticalSurveyBoardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerticalSurveyBoardRoutingModule { }
