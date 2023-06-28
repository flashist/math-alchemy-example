import { BaseAppCommand, appStorage } from "@flashist/appframework";
import { GameLogicModuleState } from "../../data/state/GameLogicModuleState";
import { ISelectedFormulaElementVO } from "../../data/formula/ISelectedFormulaElementVO";

export class AddFormulaElementCommand extends BaseAppCommand {
    protected gameLogicState = appStorage().getState<GameLogicModuleState>();

    protected elementid: string;

    constructor(elementId: string) {
        super();

        this.elementid = elementId;
    }

    protected executeInternal(): void {
        const newSelectedElementData: ISelectedFormulaElementVO = {
            formulaElementId: this.elementid,
            index: this.gameLogicState.gameLogic.dynamic.selectedElements.length
        };
        appStorage().push<GameLogicModuleState>()("gameLogic.dynamic.selectedElements", newSelectedElementData);

        // appStorage().push<GameLogicModuleState>()("gameLogic.dynamic.selectedElementIds", this.elementid);

        this.notifyComplete();
    }
}