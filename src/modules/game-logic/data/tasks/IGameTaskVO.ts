import { GameTaskType } from "./GameTaskType";

export interface IGameTaskVO {
    id: string;
    // type: GameTaskType;
    requiredAvailableFormulaElementIds?: string[];
    formulaElementId: string;
    isPredefined: boolean;
}