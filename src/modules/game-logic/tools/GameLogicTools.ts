import mathsteps from "mathsteps";
import Mexp from "math-expression-evaluator";

import { StringTools, NumberTools, AngleTools, IDelayedFunctionVO } from "@flashist/fcore";
import { DeepReadonly, appStorage } from "@flashist/appframework";
import { GameLogicModuleState } from "../data/state/GameLogicModuleState";
import { IFormulaElementVO } from "../data/formula/IFormulaElementVO";
import { FormulaElementType } from "../data/formula/FormulaElementType";
import { ISelectedFormulaElementVO } from "../data/formula/ISelectedFormulaElementVO";
import { OperationId } from "../data/formula/OperationId";
import { FormulaErrorId } from "../data/formula/FormulaErrorId";
import { IGameTaskVO } from "../data/tasks/IGameTaskVO";
import { Analytics } from "../../analytics/Analytics";
import { AnalyticsEvent } from "../../analytics/AnalyticsEvent";
import { IComputeFormulaResultVO } from "./IComputeFormulaResultVO";

export class GameLogicTools {

    protected gameLogicState = appStorage().getState<GameLogicModuleState>();

    // public checkIfCanAddPlayerActions(): boolean {
    //     let result: boolean = true;

    //     if (this.gameLogicState.gameLogic.dynamic.player.plannedActions.length >= this.gameLogicState.gameLogic.dynamic.player.maxActionsPerTurn) {
    //         result = false;
    //     }

    //     return result;
    // }

    public getCurSelectedFormula(): string {
        let result: string = "";

        const curSelectedElements: IFormulaElementVO[] = this.getFormulaElementsDataForCurrentSelectedElements();
        const elementsCount: number = curSelectedElements.length;
        for (let elementIndex: number = 0; elementIndex < elementsCount; elementIndex++) {
            const tempElement: IFormulaElementVO = curSelectedElements[elementIndex];
            result += tempElement.formulaValue;
        }

        return result;
    }

    public findDiscoveryType(formula: string): FormulaElementType {
        let result: FormulaElementType = FormulaElementType.NUMBER;

        // Number can't stand next to another number! (that's a simple rule for now)
        // if something is !isNaN - it's a number

        const equalElement: IFormulaElementVO = this.getFormulaElementById(OperationId.EQUAL);
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const questionElementIndex: number = formula.indexOf(questionElement.formulaValue);
        if (questionElementIndex >= 0) {
            if (questionElementIndex > 0) {
                // Check for left-side symbol
                const tempSymbol: string = formula.charAt(questionElementIndex - 1);
                const tempSymbolFloat: number = parseFloat(tempSymbol);
                if (!isNaN(tempSymbolFloat)) {
                    if (tempSymbol !== "") {
                        result = FormulaElementType.OPERATION;
                    }
                }
            }
            if (questionElementIndex < formula.length - 1) {
                // Check for right-side symbol
                const tempSymbol: string = formula.charAt(questionElementIndex + 1);
                const tempSymbolFloat: number = parseFloat(tempSymbol);
                if (!isNaN(tempSymbolFloat)) {
                    result = FormulaElementType.OPERATION;
                }
            }
        }

        return result;
    }

    public computeFormula(formula: string): IComputeFormulaResultVO {
        let result: IComputeFormulaResultVO = {
            formula: formula
        };

        const formulaErrorId: string = this.findFormulaErrorId(formula);
        if (formulaErrorId) {
            // new ShowFormulaErrorCommand(formulaErrorId, curFormula)
            //     .execute();
            result.errorId = formulaErrorId;

        } else {

            // const isOperation: boolean = this.checkIfDiscoveringOperation(formula);
            const discoveryType: FormulaElementType = this.findDiscoveryType(formula);
            if (discoveryType === FormulaElementType.OPERATION) {
                // result = this.computeOperation(curFormula);
                result.discoverType = FormulaElementType.OPERATION;
            } else {
                // result = this.computeNumber(curFormula);
                result.discoverType = FormulaElementType.NUMBER;
            }
        }


        if (result.discoverType === FormulaElementType.OPERATION) {
            const resultElement: IFormulaElementVO = this.computeOperationDiscoveringFormula(formula);
            // console.log("ComputeCurrentFormulaCommand | computeOperation __ resultElement: ", resultElement);
            if (resultElement) {
                const isOpen: boolean = this.checkIfElementIsOpen(resultElement.id);

                result.isNew = !isOpen;
                result.resultElement = resultElement;
                result.formulaValue = resultElement.formulaValue;
            }
        }

        if (result.discoverType === FormulaElementType.NUMBER) {

            // Finding a number
            const formulaResult: number = this.computeNumberDiscoveringFormula(formula);
            if (formulaResult || formulaResult === 0) {
                const resultElement: IFormulaElementVO = this.findFormulaElements({ formulaValues: [formulaResult.toString()] })?.[0];
                if (resultElement) {
                    const isOpen: boolean = this.checkIfElementIsOpen(resultElement.id)
                    result.isNew = !isOpen;
                    result.resultElement = resultElement;
                    result.formulaValue = resultElement.formulaValue;

                } else {
                    result.formulaValue = formulaResult.toString();
                }
            }
        }

        return result;
    }

    public computeOperationDiscoveringFormula(formula: string): IFormulaElementVO {
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);

        // Splitting the formula into 2 parts (before = and after)
        const equationSplit: string[] = formula.split("=");
        // Finding which part has the question element
        let questionPart: string = equationSplit[0];
        let resultPart: string = equationSplit[1];
        if (questionPart.indexOf(questionElement.formulaValue) === -1) {
            questionPart = equationSplit[1];
            resultPart = equationSplit[0];
        }

        //
        const targetResult: number = this.findResultOfFormula(resultPart);
        // console.log("numberResult: ", targetResult);

        //
        const operationsToCheck: IFormulaElementVO[] = this.findFormulaElements({
            type: FormulaElementType.OPERATION,
            substitutionDiscovery: true
        });

        let lastError: any;
        let resultElement: IFormulaElementVO;
        for (let singleOperation of operationsToCheck) {
            let substitutedQuestionMarkFormula: string = questionPart.split(questionElement.formulaValue).join(singleOperation.formulaValue);
            // console.log("singleOperation: ", singleOperation, " | substitutedQuestionMarkFormula: ", substitutedQuestionMarkFormula);
            try {
                const substitutedFormulaResult: number = this.findResultOfFormula(substitutedQuestionMarkFormula);
                // console.log("substitutedFormulaResult: ", substitutedFormulaResult);
                if (substitutedFormulaResult === targetResult) {
                    resultElement = singleOperation;
                    break;
                }

            } catch (error) {
                // Only the last error will bo logged,
                // And only in the case if a formula wasn't solved!
                // It's needed to log only real errors, because others might be a result of substitution-checking proceedures
                lastError = error;
            }
        }

        if (!resultElement) {
            const tempMsg: string = "ERROR! While substituting formula: " + formula + " | error: " + JSON.stringify(lastError);
            console.error(tempMsg);
            //
            Analytics.logEvent(
                AnalyticsEvent.ERROR,
                {
                    msg: tempMsg,
                    error: JSON.stringify(lastError)
                }
            );
        }

        return resultElement;
    }

    public getFormulaElementById(id: string): IFormulaElementVO {
        return this.gameLogicState.gameLogic.static.formulaElements[id];
    }

    public computeNumberDiscoveringFormula(formula: string): number {
        let result: number;

        // 
        if (this.checkIfExponentiationParamDiscoveringFormula(formula)) {
            result = this.computeExponentiationNumberDiscoveringFormula(formula);
        } else if (this.checkIfSquareRootParamDiscoveringFormula(formula)) {
            result = this.computeSquareRootNumberDiscoveringFormula(formula);
        } else if (this.checkIfFactorialParamDiscoveringFormula(formula)) {
            result = this.computeFactorialNumberDiscoveringFormula(formula);
        } else if (this.checkIfDecimalPointParamDiscoveringFormula(formula)) {
            result = this.computeDecimalPointNumberDiscoveringFormula(formula);

            // } else if (this.checkIfSineParamDiscoveringFormula(formula)) {
            //     result = this.computeSineNumberDiscoveringFormula(formula);
            // } else if (this.checkIfCosineParamDiscoveringFormula(formula)) {
            //     result = this.computeCosineNumberDiscoveringFormula(formula);
            // } else if (this.checkIfTangentParamDiscoveringFormula(formula)) {
            //     result = this.computeTangentNumberDiscoveringFormula(formula);

            // } else if (this.checkIfLogParamDiscoveringFormula(formula)) {
            //     result = this.computeLogNumberDiscoveringFormula(formula);

        } else {
            result = this.computeSimpleNumberDiscoveringFormula(formula);
        }

        result = this.castToSufficientPrecision(result);

        return result;
    }

    protected getAllOperationElements(): IFormulaElementVO[] {
        let result: IFormulaElementVO[] = [];

        const exceptionElements: IFormulaElementVO[] = [
            // this.getFormulaElementById(OperationId.QUESTION)
        ];

        const operationFormulaValues: string[] = [];
        const operationKeys: string[] = Object.values(OperationId);
        for (let singleOperationKey of operationKeys) {
            const singleOperation: IFormulaElementVO = this.getFormulaElementById(singleOperationKey);
            if (exceptionElements.indexOf(singleOperation) === -1) {
                result.push(singleOperation);
            }
        }

        return result;
    }

    protected splitFormulaToElements(formula: string): string[] {
        let result: string[] = [];

        // const operationsToSplitOnList: IFormulaElementVO[] = [
        //     this.getFormulaElementById(OperationId.EQUAL),
        //     this.getFormulaElementById(OperationId.QUESTION),
        //     this.getFormulaElementById(OperationId.ADDITION),
        //     this.getFormulaElementById(OperationId.SUBSTRACTION),
        //     this.getFormulaElementById(OperationId.MULTIPLICATION),
        //     this.getFormulaElementById(OperationId.DIVISION),
        //     this.getFormulaElementById(OperationId.EXPONENTIATION),
        //     this.getFormulaElementById(OperationId.SQUARE_ROOT),
        //     this.getFormulaElementById(OperationId.FACTORIAL),
        //     this.getFormulaElementById(OperationId.DECIMAL_POINT)
        // ];
        const operationsToSplitOnList: IFormulaElementVO[] = this.getAllOperationElements();

        let checkFormula: string = formula;
        let keepChecking: boolean = true;
        while (keepChecking) {
            let operationFound: boolean = false;
            let mostLeftOperationIndex: number = null;
            let mostLeftOperationElement: IFormulaElementVO = null;
            for (let singleOperationElement of operationsToSplitOnList) {
                const operationIndex: number = checkFormula.indexOf(singleOperationElement.formulaValue);
                if (operationIndex !== -1) {
                    if (!operationFound || operationIndex < mostLeftOperationIndex) {
                        operationFound = true;
                        mostLeftOperationIndex = operationIndex;
                        mostLeftOperationElement = singleOperationElement;
                    }
                }
                // const formula.split(singleOperationElement.formulaValue)
            }

            if (operationFound) {
                const opereationPartEndIndex: number = mostLeftOperationIndex + mostLeftOperationElement.formulaValue.length;

                const leftPart: string = checkFormula.substring(0, mostLeftOperationIndex);
                if (leftPart) {
                    result.push(leftPart);
                }
                const operationPart: string = checkFormula.substring(mostLeftOperationIndex, opereationPartEndIndex);
                result.push(operationPart);

                const rightPart: string = checkFormula.substring(opereationPartEndIndex);

                checkFormula = rightPart;

            } else {
                result.push(checkFormula);

                keepChecking = false;
                break;
            }
        }

        // IMPORTANT: doesn't work in Safari because of lookbehind
        // let regex = new RegExp(`(?<=[+-/*^=x])|(?=[+-/*^=x])`);
        // let result: string[] = formula.split(regex);

        return result;
    }

    protected computeSimpleNumberDiscoveringFormula(formula: string): number {
        const formulaWithoutSpaces: string = formula.split(" ").join("");

        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);

        let finalLeftPart: string = formula.split("=")[0];
        let finalRightPart: string = formula.split("=")[1];

        const steps = mathsteps.solveEquation(formula);
        if (steps && steps.length > 0) {
            const lastStep = steps[steps.length - 1];
            const lastStepExpression: string = lastStep.newEquation.ascii();
            finalLeftPart = lastStepExpression.split("=")[0];
            finalRightPart = lastStepExpression.split("=")[1];
        }
        // console.log("lastStepExpression: ", lastStepExpression);
        // console.log("lastStepRightPart: ", lastStepRightPart);

        let finalPartWithUnknown: string = finalLeftPart;
        let finalPartWithExpression: string = finalRightPart;
        if (finalPartWithUnknown.indexOf(questionElement.formulaValue) === -1) {
            finalPartWithUnknown = finalRightPart;
            finalPartWithExpression = finalLeftPart;
        }
        // Remove empty spaces
        finalPartWithUnknown = finalPartWithUnknown.split(" ").join("");
        finalPartWithExpression = finalPartWithExpression.split(" ").join("")

        let result: number;

        let expressionResult: number = this.findResultOfFormula(finalPartWithExpression);
        result = expressionResult;

        // If the part with the unknown variable is more than just the variable,
        // then continue simplifying it
        if (finalPartWithUnknown !== questionElement.formulaValue) {
            let newFormula: string = `${expressionResult}=${finalPartWithUnknown}`;

            if (newFormula !== formulaWithoutSpaces) {
                result = this.computeSimpleNumberDiscoveringFormula(newFormula);
            }
        }

        return result;
    }

    public findResultOfFormula(formula: string): number {
        const mexp: Mexp = new Mexp();

        var lexed = mexp.lex(formula, undefined);
        // console.log("findResultOfFormula __ lexed: ", lexed)
        var postfixed = mexp.toPostfix(lexed);
        // console.log("findResultOfFormula __ postfixed: ", postfixed)
        var result = mexp.postfixEval(postfixed, undefined);
        // console.log("findResultOfFormula __ result: ", result)

        return result;
    }

    public getFormulaElementsDataForCurrentSelectedElements(): IFormulaElementVO[] {
        const selectedElementIds: string[] = [];
        for (let singleSelectedElement of this.gameLogicState.gameLogic.dynamic.selectedElements) {
            selectedElementIds.push(singleSelectedElement.formulaElementId);
        }

        let result: IFormulaElementVO[] = this.findFormulaElements({ ids: selectedElementIds });
        return result;
    }

    // public getFormulaElementsDataByIds(ids: readonly string[], types?: FormulaElementType, ordered?: boolean): IFormulaElementVO[] {
    public findFormulaElements(
        config: {
            ids?: readonly string[],
            formulaValues?: string[],
            type?: FormulaElementType,
            ordered?: boolean,
            substitutionDiscovery?: boolean,
            allowedForSelection?: boolean
            allowedForGeneratingTasks?: boolean
        }
    ): IFormulaElementVO[] {

        const result: IFormulaElementVO[] = [];

        let elementIds: readonly string[] = config.ids;
        if (!elementIds) {
            elementIds = Object.keys(this.gameLogicState.gameLogic.static.formulaElements);
        }

        for (let singleElementId of elementIds) {
            const elementData: IFormulaElementVO = this.getFormulaElementById(singleElementId);

            let shouldBeAdded: boolean = true;

            if (config.formulaValues) {
                if (config.formulaValues.indexOf(elementData.formulaValue) === -1) {
                    shouldBeAdded = false;
                }
            }

            if (config.type && config.type.indexOf(elementData.type) === -1) {
                shouldBeAdded = false;
            }

            if (config.substitutionDiscovery === true || config.substitutionDiscovery === false) {
                if (elementData.substitutionDiscovery !== config.substitutionDiscovery) {
                    shouldBeAdded = false;
                }
            }

            if (config.allowedForSelection === true || config.allowedForSelection === false) {
                if (elementData.allowedForSelection !== config.allowedForSelection) {
                    shouldBeAdded = false;
                }
            }

            if (config.allowedForGeneratingTasks === true || config.allowedForGeneratingTasks === false) {
                if (elementData.allowedForGeneratingTasks !== config.allowedForGeneratingTasks) {
                    shouldBeAdded = false;
                }
            }

            if (shouldBeAdded) {
                result.push(elementData);
            }
        }

        if (config.ordered) {
            result.sort(
                (item1: IFormulaElementVO, item2: IFormulaElementVO) => {
                    let sortResult: number = 0;

                    let item1Order: number = item1.order || 0;
                    let item2Order: number = item2.order || 0;
                    if (item1Order !== item2Order) {
                        sortResult = item1Order - item2Order;
                    }

                    return sortResult;
                }
            )
        }

        return result;
    }

    public updateSelectedElementIndices(): void {
        const elementsCount: number = this.gameLogicState.gameLogic.dynamic.selectedElements.length;
        for (let elementIndex: number = 0; elementIndex < elementsCount; elementIndex++) {
            let tempSelectedElement: ISelectedFormulaElementVO = this.gameLogicState.gameLogic.dynamic.selectedElements[elementIndex];
            if (tempSelectedElement.index !== elementIndex) {
                appStorage().change<GameLogicModuleState>()(`gameLogic.dynamic.selectedElements.${elementIndex}.index`, elementIndex)
            }
        }
    }

    public checkIfElementIsOpen(elementId: string): boolean {
        let result: boolean = false;

        const elementIndex: number = this.gameLogicState.gameLogic.dynamic.openElementIds.indexOf(elementId);
        if (elementIndex !== -1) {
            result = true;
        }

        return result;
    }

    public findFormulaErrorId(formula: string): string {
        let result: string = "";

        const equalElement: IFormulaElementVO = this.getFormulaElementById(OperationId.EQUAL);
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);

        // 1. Check that there is the only 1 "=" (but at least 1)
        if (StringTools.count(formula, equalElement.formulaValue) !== 1) {
            result = FormulaErrorId.EQUAL_SIGN;

            // 2. Check that there is the only 1 "?" (but at least 1)
        } else if (StringTools.count(formula, questionElement.formulaValue) !== 1) {
            result = FormulaErrorId.QUESTION_SIGN;

        } else {
            try {
                // const isOperation: boolean = this.checkIfDiscoveringOperation(formula);
                const discoveryType: FormulaElementType = this.findDiscoveryType(formula);
                if (discoveryType === FormulaElementType.OPERATION) {
                    const elementFormulaResult: IFormulaElementVO = this.computeOperationDiscoveringFormula(formula);
                } else {
                    const formulaResult: number = this.computeNumberDiscoveringFormula(formula);
                }

            } catch (error) {
                const tempMsg: string = "ERROR! Formula has an undefined error! formula: " + formula + " | error: " + JSON.stringify(error);
                console.error(tempMsg);
                //
                Analytics.logEvent(
                    AnalyticsEvent.ERROR,
                    {
                        msg: tempMsg,
                        error: JSON.stringify(error)
                    }
                );

                result = FormulaErrorId.DEFAULT;
            }
            // TODO: create check for a default error (but make sure you don't show the error when everything is fine with formula)
        }

        return result;
    }

    public getActiveTasksData(): IGameTaskVO[] {
        let result: IGameTaskVO[] = [];

        for (let singleTaskId of this.gameLogicState.gameLogic.dynamic.tasks.activeIds) {
            result.push(
                this.gameLogicState.gameLogic.static.tasks[singleTaskId] as any
            );
        }

        return result;
    }

    public getTaskIdsReadyToActivate(): string[] {
        let result: string[] = [];

        const taskIds: string[] = Object.keys(this.gameLogicState.gameLogic.static.tasks);
        for (let singleTaskId of taskIds) {
            if (this.checkIfTaskCanBeActivated(singleTaskId)) {
                result.push(singleTaskId);
            }
        }

        return result;
    }

    public checkIfTaskComplete(taskId: string): boolean {
        let result: boolean = false;

        if (this.gameLogicState.gameLogic.dynamic.tasks.completeIds.indexOf(taskId) !== -1) {
            result = true;
        }

        return result;
    }

    public checkIfTaskActive(taskId: string): boolean {
        let result: boolean = false;

        if (this.gameLogicState.gameLogic.dynamic.tasks.activeIds.indexOf(taskId) !== -1) {
            result = true;
        }

        return result;
    }

    public checkIfTaskElementFound(taskId: string): boolean {
        let result: boolean = false;

        const tempTaskData: DeepReadonly<IGameTaskVO> = this.gameLogicState.gameLogic.static.tasks[taskId];
        if (this.gameLogicState.gameLogic.dynamic.openElementIds.indexOf(tempTaskData.formulaElementId) !== -1) {
            result = true;
        }

        return result;
    }

    public checkIfTaskCanBeActivated(taskId: string): boolean {
        let result: boolean = true;

        if (this.checkIfTaskActive(taskId)) {
            result = false;
        }

        if (result) {
            // If the task was already complete, we can't activate it again
            if (this.checkIfTaskComplete(taskId)) {
                result = false;
            }
        }

        if (result) {
            if (this.checkIfTaskElementFound(taskId)) {
                result = false;
            }
        }

        if (result) {
            const tempTaskData: DeepReadonly<IGameTaskVO> = this.gameLogicState.gameLogic.static.tasks[taskId];
            // Check if all requirements for the task are met
            if (tempTaskData.requiredAvailableFormulaElementIds) {
                for (let singleRequiredId of tempTaskData.requiredAvailableFormulaElementIds) {
                    if (this.gameLogicState.gameLogic.dynamic.openElementIds.indexOf(singleRequiredId) === -1) {
                        result = false;
                        break;
                    }
                }
            }
        }

        return result;
    }

    public castToSufficientPrecision(number: number): number {
        return NumberTools.roundTo(number, 1 / Math.pow(10, 5))
    }


    // EXPONENTIATION

    protected checkIfExponentiationParamDiscoveringFormula(formula: string): boolean {
        let result: boolean;

        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const exponentiationElement: IFormulaElementVO = this.getFormulaElementById(OperationId.EXPONENTIATION);
        const splitElements: string[] = this.splitFormulaToElements(formula);
        const exponentiationElementIndex: number = splitElements.indexOf(exponentiationElement.formulaValue);
        if (exponentiationElementIndex !== -1) {
            if (exponentiationElementIndex > 0 && exponentiationElementIndex < splitElements.length - 1) {
                let baseParam: string = splitElements[exponentiationElementIndex - 1];
                let exponentParam: string = splitElements[exponentiationElementIndex + 1];
                if (baseParam === questionElement.formulaValue || exponentParam === questionElement.formulaValue) {
                    result = true;
                }
            }
        }

        return result;
    }

    protected computeExponentiationNumberDiscoveringFormula(formula: string): number {
        // let equation = "1.5+4.2*(5+2)^5";
        // let regex = new RegExp(`(?<=[-+*^/()])|(?=[-+*^/()])`);
        // console.log(equation.split(regex))
        // console.log(equation)
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const exponentiationElement: IFormulaElementVO = this.getFormulaElementById(OperationId.EXPONENTIATION);

        // const allOperationsValues: string = this.getAllOperationsFormulaValues();
        // const regex = new RegExp(`(?<=[${allOperationsValues}])|(?=[${allOperationsValues}])`);
        // const formulaSplitElements: string[] = formula.split(regex);
        const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
        const exponentiationIndex: number = formulaSplitElements.indexOf(exponentiationElement.formulaValue);

        const exponentiationLeftPart: string = formulaSplitElements[exponentiationIndex - 1];
        const exponentiationCenterPart: string = formulaSplitElements[exponentiationIndex];
        const exponentiationRightPart: string = formulaSplitElements[exponentiationIndex + 1];
        //
        const fullExponentiationText: string = exponentiationLeftPart + exponentiationCenterPart + exponentiationRightPart;

        //
        const unknownVariable: string = questionElement.formulaValue;
        // Replace elements connected to the exponentiation with an unknown variable x
        const formulaWithReplacedExponentiation: string = formula.split(fullExponentiationText).join(unknownVariable);
        const replacedExponentiationResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedExponentiation);

        let result: number;
        // If the unknown is the base part (left number)
        if (exponentiationLeftPart === questionElement.formulaValue) {
            // result = Math.pow(replacedExponentiationResult, (1 / parseFloat(exponentiationRightPart)));
            result = this.findExponentiationBase(parseFloat(exponentiationRightPart), replacedExponentiationResult);

            // If the unknown is the exponent part (right number)
        } else {
            // result = Math.log(replacedExponentiationResult) / Math.log(parseFloat(exponentiationLeftPart));
            result = this.findExponentiationExponent(parseFloat(exponentiationLeftPart), replacedExponentiationResult);
        }

        return result;
    }

    public findExponentiationBase(exponentPart: number, result: number): number {
        return Math.pow(result, (1 / exponentPart));
    }

    public findExponentiationExponent(basePart: number, result: number): number {
        return Math.log(result) / Math.log(basePart);
    }


    // SQUARE ROOT

    protected checkIfSquareRootParamDiscoveringFormula(formula: string): boolean {
        let result: boolean;

        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const squareRootElement: IFormulaElementVO = this.getFormulaElementById(OperationId.SQUARE_ROOT);
        const splitElements: string[] = this.splitFormulaToElements(formula);
        const squareRootElementIndex: number = splitElements.indexOf(squareRootElement.formulaValue);
        if (squareRootElementIndex !== -1) {
            if (squareRootElementIndex < splitElements.length - 1) {
                let squareRootArgument: string = splitElements[squareRootElementIndex + 1];
                if (squareRootArgument === questionElement.formulaValue) {
                    result = true;
                }
            }
        }

        return result;
    }

    protected computeSquareRootNumberDiscoveringFormula(formula: string): number {
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const squareRootElement: IFormulaElementVO = this.getFormulaElementById(OperationId.SQUARE_ROOT);

        const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
        const squareRootIndex: number = formulaSplitElements.indexOf(squareRootElement.formulaValue);

        // 
        const squareRootNamePart: string = formulaSplitElements[squareRootIndex];
        const squareRootUnknownPart: string = formulaSplitElements[squareRootIndex + 1];
        //
        const fullSquareRootText: string = squareRootNamePart + squareRootUnknownPart;

        //
        const unknownVariable: string = questionElement.formulaValue;
        // Replace elements connected to the exponentiation with an unknown variable x
        const formulaWithReplacedSquareRoot: string = formula.split(fullSquareRootText).join(unknownVariable);
        const replacedSquareRootResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedSquareRoot);

        // let result: number = Math.pow(replacedSquareRootResult, 2);
        const result: number = this.findSquareRootBase(replacedSquareRootResult);
        return result;
    }

    public findSquareRootBase(result: number): number {
        return Math.pow(result, 2)
    }


    // FACTORIAL

    protected checkIfFactorialParamDiscoveringFormula(formula: string): boolean {
        let result: boolean;

        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const factorialElement: IFormulaElementVO = this.getFormulaElementById(OperationId.FACTORIAL);
        const splitElements: string[] = this.splitFormulaToElements(formula);
        const factorialElementIndex: number = splitElements.indexOf(factorialElement.formulaValue);
        if (factorialElementIndex !== -1) {
            if (factorialElementIndex > 0) {
                let factorialArgument: string = splitElements[factorialElementIndex - 1];
                if (factorialArgument === questionElement.formulaValue) {
                    result = true;
                }
            }
        }

        return result;
    }

    protected computeFactorialNumberDiscoveringFormula(formula: string): number {
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const factorialElement: IFormulaElementVO = this.getFormulaElementById(OperationId.FACTORIAL);

        const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
        const factorialIndex: number = formulaSplitElements.indexOf(factorialElement.formulaValue);

        // 
        const factorialNamePart: string = formulaSplitElements[factorialIndex];
        const factorialUnknownPart: string = formulaSplitElements[factorialIndex - 1];
        //
        const fullFactorialText: string = factorialUnknownPart + factorialNamePart;

        //
        const unknownVariable: string = questionElement.formulaValue;
        // Replace elements connected to the exponentiation with an unknown variable x
        const formulaWithReplacedFactorial: string = formula.split(fullFactorialText).join(unknownVariable);
        const replacedFactorialResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedFactorial);

        // let result: number = Math.pow(replacedFactorialResult, 2);
        let result: number = this.findFactorialBase(replacedFactorialResult);
        return result;
    }

    // protected foundFactorials: number[] = [];
    protected foundFactorialBases: { [factorial: number]: number } = {};
    //
    public findFactorialBase(factorial: number): number {
        let result: number;

        if (this.foundFactorialBases[factorial]) {
            result = this.foundFactorialBases[factorial];

        } else {
            let maxStepsCount: number = 20;
            let stepIndex: number = 1;
            let foundFactorial: number = 1;
            while (stepIndex <= maxStepsCount) {
                foundFactorial *= stepIndex;
                this.foundFactorialBases[stepIndex] = foundFactorial;

                if (foundFactorial === factorial) {
                    result = stepIndex;
                    break;
                }

                stepIndex++;
            }
        }

        return result;
    }


    // DECIMAL POINT

    protected checkIfDecimalPointParamDiscoveringFormula(formula: string): boolean {
        let result: boolean;

        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const decimalPointElement: IFormulaElementVO = this.getFormulaElementById(OperationId.DECIMAL_POINT);
        const splitElements: string[] = this.splitFormulaToElements(formula);
        const decimalPointElementIndex: number = splitElements.indexOf(decimalPointElement.formulaValue);
        if (decimalPointElementIndex !== -1) {
            if (decimalPointElementIndex > 0 && decimalPointElementIndex < splitElements.length - 1) {
                let baseParam: string = splitElements[decimalPointElementIndex - 1];
                let exponentParam: string = splitElements[decimalPointElementIndex + 1];
                if (baseParam === questionElement.formulaValue || exponentParam === questionElement.formulaValue) {
                    result = true;
                }
            }
        }

        return result;
    }

    protected computeDecimalPointNumberDiscoveringFormula(formula: string): number {
        const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
        const decimalPointElement: IFormulaElementVO = this.getFormulaElementById(OperationId.DECIMAL_POINT);

        const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
        const decimalPointIndex: number = formulaSplitElements.indexOf(decimalPointElement.formulaValue);

        const decimalPointLeftPart: string = formulaSplitElements[decimalPointIndex - 1];
        const decimalPointCenterPart: string = formulaSplitElements[decimalPointIndex];
        const decimalPointRightPart: string = formulaSplitElements[decimalPointIndex + 1];
        //
        const fullDecimalPointText: string = decimalPointLeftPart + decimalPointCenterPart + decimalPointRightPart;

        //
        const unknownVariable: string = questionElement.formulaValue;
        // Replace elements connected to the decimalPoint with an unknown variable x
        const formulaWithReplacedDecimalPoint: string = formula.split(fullDecimalPointText).join(unknownVariable);
        const replacedDecimalPointResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedDecimalPoint);
        const replacedDecimalPointResultText: string = replacedDecimalPointResult.toString();
        const splitReplacedDecimalPointResultText: string[] = replacedDecimalPointResultText.split(".");

        let result: number;
        // If the unknown is the left-number from the decimal point
        if (decimalPointLeftPart === questionElement.formulaValue) {
            result = parseFloat(splitReplacedDecimalPointResultText[0]);

            // If the unknown is the right-number from the decimal point
        } else {
            result = parseFloat(splitReplacedDecimalPointResultText[1]);
        }

        return result;
    }


    // // SINE

    // protected checkIfSineParamDiscoveringFormula(formula: string): boolean {
    //     let result: boolean;

    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const sineElement: IFormulaElementVO = this.getFormulaElementById(OperationId.SINE);
    //     const splitElements: string[] = this.splitFormulaToElements(formula);
    //     const sineElementIndex: number = splitElements.indexOf(sineElement.formulaValue);
    //     if (sineElementIndex !== -1) {
    //         if (sineElementIndex < splitElements.length - 1) {
    //             let sineArgument: string = splitElements[sineElementIndex + 1];
    //             if (sineArgument === questionElement.formulaValue) {
    //                 result = true;
    //             }
    //         }
    //     }

    //     return result;
    // }

    // protected computeSineNumberDiscoveringFormula(formula: string): number {
    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const sineElement: IFormulaElementVO = this.getFormulaElementById(OperationId.SINE);

    //     const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
    //     const sineIndex: number = formulaSplitElements.indexOf(sineElement.formulaValue);

    //     // 
    //     const sineNamePart: string = formulaSplitElements[sineIndex];
    //     const sineUnknownPart: string = formulaSplitElements[sineIndex + 1];
    //     //
    //     const fullSineText: string = sineNamePart + sineUnknownPart;

    //     //
    //     const unknownVariable: string = questionElement.formulaValue;
    //     // Replace elements connected to the exponentiation with an unknown variable x
    //     const formulaWithReplacedSine: string = formula.split(fullSineText).join(unknownVariable);
    //     const replacedSineResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedSine);

    //     let resultRadians: number = Math.asin(replacedSineResult);

    //     let resultDegrees: number = AngleTools.radiansToDegrees(resultRadians);
    //     return resultDegrees;
    // }


    // // COSINE

    // protected checkIfCosineParamDiscoveringFormula(formula: string): boolean {
    //     let result: boolean;

    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const cosElement: IFormulaElementVO = this.getFormulaElementById(OperationId.COSINE);
    //     const splitElements: string[] = this.splitFormulaToElements(formula);
    //     const cosElementIndex: number = splitElements.indexOf(cosElement.formulaValue);
    //     if (cosElementIndex !== -1) {
    //         if (cosElementIndex < splitElements.length - 1) {
    //             let cosArgument: string = splitElements[cosElementIndex + 1];
    //             if (cosArgument === questionElement.formulaValue) {
    //                 result = true;
    //             }
    //         }
    //     }

    //     return result;
    // }

    // protected computeCosineNumberDiscoveringFormula(formula: string): number {
    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const cosElement: IFormulaElementVO = this.getFormulaElementById(OperationId.COSINE);

    //     const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
    //     const cosIndex: number = formulaSplitElements.indexOf(cosElement.formulaValue);

    //     // 
    //     const cosNamePart: string = formulaSplitElements[cosIndex];
    //     const cosUnknownPart: string = formulaSplitElements[cosIndex + 1];
    //     //
    //     const fullCosText: string = cosNamePart + cosUnknownPart;

    //     //
    //     const unknownVariable: string = questionElement.formulaValue;
    //     // Replace elements connected to the exponentiation with an unknown variable x
    //     const formulaWithReplacedCos: string = formula.split(fullCosText).join(unknownVariable);
    //     const replacedCosResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedCos);

    //     let resultRadians: number = Math.acos(replacedCosResult);

    //     let resultDegrees: number = AngleTools.radiansToDegrees(resultRadians);
    //     return resultDegrees;
    // }


    // // TANGENT

    // protected checkIfTangentParamDiscoveringFormula(formula: string): boolean {
    //     let result: boolean;

    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const tanElement: IFormulaElementVO = this.getFormulaElementById(OperationId.TANGENT);
    //     const splitElements: string[] = this.splitFormulaToElements(formula);
    //     const tanElementIndex: number = splitElements.indexOf(tanElement.formulaValue);
    //     if (tanElementIndex !== -1) {
    //         if (tanElementIndex < splitElements.length - 1) {
    //             let tanArgument: string = splitElements[tanElementIndex + 1];
    //             if (tanArgument === questionElement.formulaValue) {
    //                 result = true;
    //             }
    //         }
    //     }

    //     return result;
    // }

    // protected computeTangentNumberDiscoveringFormula(formula: string): number {
    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const tanElement: IFormulaElementVO = this.getFormulaElementById(OperationId.TANGENT);

    //     const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
    //     const tanIndex: number = formulaSplitElements.indexOf(tanElement.formulaValue);

    //     // 
    //     const tanNamePart: string = formulaSplitElements[tanIndex];
    //     const tanUnknownPart: string = formulaSplitElements[tanIndex + 1];
    //     //
    //     const fullTanText: string = tanNamePart + tanUnknownPart;

    //     //
    //     const unknownVariable: string = questionElement.formulaValue;
    //     // Replace elements connected to the exponentiation with an unknown variable x
    //     const formulaWithReplacedTan: string = formula.split(fullTanText).join(unknownVariable);
    //     const replacedTanResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedTan);

    //     let resultRadians: number = Math.atan(replacedTanResult);

    //     let resultDegrees: number = AngleTools.radiansToDegrees(resultRadians);
    //     return resultDegrees;
    // }


    // // LOG

    // protected checkIfLogParamDiscoveringFormula(formula: string): boolean {
    //     let result: boolean;

    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const logElement: IFormulaElementVO = this.getFormulaElementById(OperationId.LOG);
    //     const splitElements: string[] = this.splitFormulaToElements(formula);
    //     const logElementIndex: number = splitElements.indexOf(logElement.formulaValue);
    //     if (logElementIndex !== -1) {
    //         if (logElementIndex < splitElements.length - 1) {
    //             let logArgument: string = splitElements[logElementIndex + 1];
    //             if (logArgument === questionElement.formulaValue) {
    //                 result = true;
    //             }
    //         }
    //     }

    //     return result;
    // }

    // protected computeLogNumberDiscoveringFormula(formula: string): number {
    //     const questionElement: IFormulaElementVO = this.getFormulaElementById(OperationId.QUESTION);
    //     const logElement: IFormulaElementVO = this.getFormulaElementById(OperationId.LOG);

    //     const formulaSplitElements: string[] = this.splitFormulaToElements(formula);
    //     const logIndex: number = formulaSplitElements.indexOf(logElement.formulaValue);

    //     // 
    //     const logNamePart: string = formulaSplitElements[logIndex];
    //     const logUnknownPart: string = formulaSplitElements[logIndex + 1];
    //     //
    //     const fullLogText: string = logNamePart + logUnknownPart;

    //     //
    //     const unknownVariable: string = questionElement.formulaValue;
    //     // Replace elements connected to the exponentiation with an unknown variable x
    //     const formulaWithReplacedLog: string = formula.split(fullLogText).join(unknownVariable);
    //     const replacedLogResult: number = this.computeSimpleNumberDiscoveringFormula(formulaWithReplacedLog);

    //     const result: number = Math.pow(10, replacedLogResult);
    //     return result;
    // }
}