import { appStorage, BaseAppCommand, Facade } from "@flashist/appframework";
import { getInstance, Point } from "@flashist/flibs";
import { ShowFormulaErrorCommand } from "../../../game-page/commands/ShowFormulaErrorCommand";
import { ShowNewDiscoveryPopupCommand } from "../../../game-page/commands/ShowNewDiscoveryPopupCommand";
import { ShowNotNewElementDiscoveryAnimationCommand } from "../../../game-page/commands/ShowNotNewElementDiscoveryAnimationCommand";
import { FormulaElementType } from "../../data/formula/FormulaElementType";
import { FormulaErrorId } from "../../data/formula/FormulaErrorId";
import { GameLogicModuleState } from "../../data/state/GameLogicModuleState";
import { GameLogicTools } from "../../tools/GameLogicTools";
import { IComputeFormulaResultVO } from "../../tools/IComputeFormulaResultVO";

export class ComputeCurrentFormulaCommand extends BaseAppCommand {

    protected gameLogicState = appStorage().getState<GameLogicModuleState>();
    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);

    protected executeInternal(): void {
        let result: string;

        const curFormula: string = this.gameLogicTools.getCurSelectedFormula();
        const formulaErrorId: string = this.gameLogicTools.findFormulaErrorId(curFormula);
        if (formulaErrorId) {
            new ShowFormulaErrorCommand(formulaErrorId, curFormula)
                .execute();

        } else {
            const computeResult: IComputeFormulaResultVO = this.gameLogicTools.computeFormula(curFormula);
            if (computeResult.discoverType === FormulaElementType.OPERATION) {
                this.processOperation(computeResult);
            } else {
                this.processNumber(computeResult);
            }
        }

        this.notifyComplete(result);
    }

    protected processOperation(result: IComputeFormulaResultVO): void {
        if (result.resultElement) {
            if (result.isNew) {
                console.log("The element is new! resultElement: ", result.resultElement);
                new ShowNewDiscoveryPopupCommand(result.resultElement.id)
                    .execute();

            } else {
                console.log("The element is old! resultElement: ", result.resultElement);
                const tempGlobalInteractionPos: Point = Facade.instance.app.getGlobalInteractionPosition();
                new ShowNotNewElementDiscoveryAnimationCommand(result.resultElement.value, tempGlobalInteractionPos.y)
                    .execute();
            }

        } else {
            new ShowFormulaErrorCommand(FormulaErrorId.OPERATION_NOT_DISCOVERED, result.formula)
                .execute();
        }
    }

    protected processNumber(result: IComputeFormulaResultVO): void {
        if (result.isNew) {
            console.log("The element is new! resultElement: ", result.resultElement);
            new ShowNewDiscoveryPopupCommand(result.resultElement.id)
                .execute();

        } else {
            console.log("The element is old! result.formulaValue: ", result.formulaValue);
            const tempGlobalInteractionPos: Point = Facade.instance.app.getGlobalInteractionPosition();
            new ShowNotNewElementDiscoveryAnimationCommand(result.formulaValue, tempGlobalInteractionPos.y)
                .execute();
        }
    }

}