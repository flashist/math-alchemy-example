import { BaseAppMediator, appStateChangeEvent, appStorage } from "@flashist/appframework";
import { InteractiveEvent, getText } from "@flashist/flibs";
import { GamePageModuleState } from "../../../data/state/GamePageModuleState";
import { FormualErrorView } from "./FormulaErrorView";
import { GameLogicModuleState } from "../../../../game-logic/data/state/GameLogicModuleState";

export class FormulaErrorMediator extends BaseAppMediator<FormualErrorView> {

    protected gamePageState = appStorage().getState<GamePageModuleState>();

    onActivatorStart(activator: FormualErrorView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GameLogicModuleState>()("gameLogic.dynamic.selectedElements"),
            this.onFormulaChange
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GamePageModuleState>()("gamePage.formulaError"),
            this.commitErrorData
        );

        this.eventListenerHelper.addEventListener(
            this.activator.btn,
            InteractiveEvent.DOWN,
            this.onSelect
        );

        this.commitErrorData();
    }

    protected onFormulaChange(): void {
        appStorage().change<GamePageModuleState>()(
            "gamePage.formulaError",
            {
                visible: false,
                errorId: ""
            }
        );
    }

    protected onSelect(): void {
        appStorage().change<GamePageModuleState>()("gamePage.popups.help.visible", true);
    }

    protected commitErrorData(): void {
        this.activator.visible = this.gamePageState.gamePage.formulaError.visible;

        this.activator.btn.text = getText(this.gamePageState.gamePage.formulaError.errorId);
        this.activator.forceArrange();
    }

}