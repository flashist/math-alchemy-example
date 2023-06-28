import { FormulaElementType } from "../data/formula/FormulaElementType";
import { IFormulaElementVO } from "../data/formula/IFormulaElementVO";

export interface IComputeFormulaResultVO {
    formula: string;
    
    errorId?: string;
    discoverType?: FormulaElementType;
    isNew?: boolean;

    resultElement?: IFormulaElementVO;
    formulaValue?: string;
}