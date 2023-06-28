import { BaseAppCommand, appStorage } from "@flashist/appframework";
import { getInstance } from "@flashist/flibs";
import { GameLogicModuleState } from "../../data/state/GameLogicModuleState";
import { GameLogicTools } from "../../tools/GameLogicTools";

export class RemoveFormulaElementByIndexCommand extends BaseAppCommand {

    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);

    protected index: number;

    constructor(index: number) {
        super();

        this.index = index;
    }

    protected executeInternal(): void {
        appStorage().splice<GameLogicModuleState>()("gameLogic.dynamic.selectedElements", this.index, 1);

        // Update indices of all elements
        this.gameLogicTools.updateSelectedElementIndices();

        this.notifyComplete();
    }
}