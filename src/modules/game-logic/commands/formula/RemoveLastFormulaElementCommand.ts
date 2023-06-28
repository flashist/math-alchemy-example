import { BaseAppCommand, appStorage } from "@flashist/appframework";
import { GameLogicModuleState } from "../../data/state/GameLogicModuleState";
import { RemoveFormulaElementByIndexCommand } from "./RemoveFormulaElementByIndexCommand";

export class RemoveLastFormulaElementCommand extends BaseAppCommand {

    protected executeInternal(): void {
        const gameLogicState = appStorage().getState<GameLogicModuleState>();
        const tempIndex: number = gameLogicState.gameLogic.dynamic.selectedElements.length - 1;
        new RemoveFormulaElementByIndexCommand(tempIndex)
            .execute()
            .then(
                () => {
                    // appStorage().splice<GameLogicModuleState>()("gameLogic.dynamic.selectedElements", gameLogicState.gameLogic.dynamic.selectedElements.length - 1);
                    this.notifyComplete();
                }
            );
    }
}