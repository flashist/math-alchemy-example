import { FormulaElementType } from "./FormulaElementType";

export interface IFormulaElementVO {
    id: string;
    type: FormulaElementType;
    value: string;
    formulaValue: string;
    order: number;

    titleId?: string;
    infoId?: string;
    substitutionDiscovery?: boolean;
    allowedForSelection?: boolean;
    allowedForGeneratingTasks: boolean;
}