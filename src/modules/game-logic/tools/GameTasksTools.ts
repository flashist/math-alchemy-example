import { getInstance } from "@flashist/flibs";

import { FormulaElementType } from "../data/formula/FormulaElementType";
import { IFormulaElementVO } from "../data/formula/IFormulaElementVO";
import { IGameTaskVO } from "../data/tasks/IGameTaskVO";
import { GameLogicTools } from "./GameLogicTools";
import { ArrayTools, NumberTools } from "@flashist/fcore";

export class GameTasksTools {

    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);

    public generateNewTask(): IGameTaskVO {
        // let result: IGameTaskVO = {
        //     id: "",
        //     formulaElementId: "",
        //     isPredefined: false
        // };

        let elementType: FormulaElementType = FormulaElementType.NUMBER;
        if (Math.random() < 0.5) {
            elementType = FormulaElementType.OPERATION;
        }

        let result: IGameTaskVO;
        if (elementType === FormulaElementType.NUMBER) {
            result = this.generateNumberTask();

        } else {
            const elementsAllowedForGeneration: IFormulaElementVO[] = this.gameLogicTools.findFormulaElements({ type: elementType, allowedForGeneratingTasks: true });
            const randElement: IFormulaElementVO = ArrayTools.getRandomItem(elementsAllowedForGeneration);
        }

        // TODO: generate formulas for each type of formula element!!!

        return result;
    }

    protected generateNumberTask(): IGameTaskVO {
        let result: IGameTaskVO = {
            id: "",
            formulaElementId: "",
            isPredefined: false
        };

        const numberToFind: number = NumberTools.getRandomInt(10, 999);
        const numberOfElements: number = NumberTools.getRandomInt(3, 5);


        return result;
    }
}