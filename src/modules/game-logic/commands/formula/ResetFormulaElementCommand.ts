import { BaseAppCommand, appStorage } from "@flashist/appframework";
import { GameLogicModuleState } from "../../data/state/GameLogicModuleState";

export class ResetFormulaElementCommand extends BaseAppCommand {

    protected executeInternal(): void {
        appStorage().splice<GameLogicModuleState>()("gameLogic.dynamic.selectedElements", 0);

        this.notifyComplete();
    }
}
