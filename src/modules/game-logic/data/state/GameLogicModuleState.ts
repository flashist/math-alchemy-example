import { FormulaElementType } from "../formula/FormulaElementType";
import { IFormulaElementVO } from "../formula/IFormulaElementVO";
import { ISelectedFormulaElementVO } from "../formula/ISelectedFormulaElementVO";
import { NumberId } from "../formula/NumberId";
import { OperationId } from "../formula/OperationId";
import { IGameTaskVO } from "../tasks/IGameTaskVO";

export const GameLogicModuleInitialState = {
    gameLogic: {
        dynamic: {
            selectedElements: [] as ISelectedFormulaElementVO[],
            openElementIds: [] as string[],

            tasks: {
                activeIds: [] as string[],
                completeIds: [] as string[],
            }
        },
        static: {

            formulaElements: {
                // Numbers
                [NumberId.ZERO]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.ZERO,
                    order: 0,
                    value: "0",
                    formulaValue: "0",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.zero.title",
                    infoId: "numbers.zero.info"
                },
                [NumberId.ONE]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.ONE,
                    order: 1,
                    value: "1",
                    formulaValue: "1",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.one.title",
                    infoId: ""
                },
                [NumberId.TWO]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.TWO,
                    order: 2,
                    value: "2",
                    formulaValue: "2",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.two.title",
                    infoId: "numbers.two.info"
                },
                [NumberId.THREE]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.THREE,
                    order: 3,
                    value: "3",
                    formulaValue: "3",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.three.title",
                    infoId: "numbers.three.info"
                },
                [NumberId.FOUR]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.FOUR,
                    order: 4,
                    value: "4",
                    formulaValue: "4",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.four.title",
                    infoId: "numbers.four.info"
                },
                [NumberId.FIVE]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.FIVE,
                    order: 5,
                    value: "5",
                    formulaValue: "5",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.five.title",
                    infoId: "numbers.five.info"
                },
                [NumberId.SIX]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.SIX,
                    order: 6,
                    value: "6",
                    formulaValue: "6",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.six.title",
                    infoId: "numbers.six.info"
                },
                [NumberId.SEVEN]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.SEVEN,
                    order: 7,
                    value: "7",
                    formulaValue: "7",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.seven.title",
                    infoId: "numbers.seven.info"
                },
                [NumberId.EIGHT]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.EIGHT,
                    order: 8,
                    value: "8",
                    formulaValue: "8",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.eight.title",
                    infoId: "numbers.eight.info"
                },
                [NumberId.NINE]: {
                    type: FormulaElementType.NUMBER,
                    id: NumberId.NINE,
                    order: 9,
                    value: "9",
                    formulaValue: "9",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "numbers.nine.title",
                    infoId: "numbers.nine.info"
                },

                // Operations
                [OperationId.QUESTION]: {
                    type: FormulaElementType.OPERATION,
                    id: OperationId.QUESTION,
                    order: 0,
                    value: "?",
                    // x - because it's used in formula parsers as one of the unknown variables,
                    // IMPORTANT: DON'T MIX UP WITH THE SIGN OF MULTIPLICATION WHICH ALSO LOOKS LIKE X
                    formulaValue: "x",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: false,
                    titleId: "operations.question.title"
                },
                [OperationId.EQUAL]: {
                    type: FormulaElementType.OPERATION,
                    id: OperationId.EQUAL,
                    order: 1,
                    value: "=",
                    formulaValue: "=",
                    allowedForSelection: true,
                    allowedForGeneratingTasks: false,
                    titleId: "operations.equal.title"
                },
                [OperationId.DECIMAL_POINT]: {
                    type: FormulaElementType.OPERATION,
                    order: 2,
                    id: OperationId.DECIMAL_POINT,
                    value: ".",
                    formulaValue: ".",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.decimalPoint.title",
                    infoId: "operations.decimalPoint.info"
                },
                [OperationId.ADDITION]: {
                    type: FormulaElementType.OPERATION,
                    id: OperationId.ADDITION,
                    order: 3,
                    value: "+",
                    formulaValue: "+",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.addition.title"
                },
                [OperationId.SUBSTRACTION]: {
                    type: FormulaElementType.OPERATION,
                    order: 4,
                    id: OperationId.SUBSTRACTION,
                    value: "-",
                    formulaValue: "-",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.substraction.title",
                    infoId: "operations.substraction.info"
                },
                [OperationId.MULTIPLICATION]: {
                    type: FormulaElementType.OPERATION,
                    order: 5,
                    id: OperationId.MULTIPLICATION,
                    value: "×",
                    formulaValue: "*",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.multiplication.title",
                    infoId: "operations.multiplication.info"
                },
                [OperationId.DIVISION]: {
                    type: FormulaElementType.OPERATION,
                    order: 6,
                    id: OperationId.DIVISION,
                    value: "÷",
                    formulaValue: "/",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.division.title",
                    infoId: "operations.division.info"
                },
                [OperationId.EXPONENTIATION]: {
                    type: FormulaElementType.OPERATION,
                    order: 7,
                    id: OperationId.EXPONENTIATION,
                    value: "^",
                    formulaValue: "^",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.exponentiation.title",
                    infoId: "operations.exponentiation.info"
                },
                [OperationId.SQUARE_ROOT]: {
                    type: FormulaElementType.OPERATION,
                    order: 8,
                    id: OperationId.SQUARE_ROOT,
                    value: "√",
                    formulaValue: "root",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.squareRoot.title",
                    infoId: "operations.squareRoot.info"
                },
                [OperationId.FACTORIAL]: {
                    type: FormulaElementType.OPERATION,
                    order: 9,
                    id: OperationId.FACTORIAL,
                    value: "!",
                    formulaValue: "!",
                    substitutionDiscovery: true,
                    allowedForSelection: true,
                    allowedForGeneratingTasks: true,
                    titleId: "operations.factorial.title",
                    infoId: "operations.factorial.info"
                },

                // [OperationId.SINE]: {
                //     type: FormulaElementType.OPERATION,
                //     order: 10,
                //     id: OperationId.SINE,
                //     value: "sin",
                //     formulaValue: "sin",
                //     substitutionDiscovery: true,
                //     allowedForSelection: false,
                //     titleId: "operations.sin.title",
                //     infoId: "operations.sin.info"
                // },
                // [OperationId.COSINE]: {
                //     type: FormulaElementType.OPERATION,
                //     order: 11,
                //     id: OperationId.COSINE,
                //     value: "cos",
                //     formulaValue: "cos",
                //     substitutionDiscovery: true,
                //     allowedForSelection: false,
                //     titleId: "operations.cos.title",
                //     infoId: "operations.cos.info"
                // },
                // [OperationId.TANGENT]: {
                //     type: FormulaElementType.OPERATION,
                //     order: 12,
                //     id: OperationId.TANGENT,
                //     value: "tan",
                //     formulaValue: "tan",
                //     substitutionDiscovery: true,
                //     allowedForSelection: false,
                //     titleId: "operations.tan.title",
                //     infoId: "operations.tan.info"
                // },
                // [OperationId.LOG]: {
                //     type: FormulaElementType.OPERATION,
                //     order: 13,
                //     id: OperationId.LOG,
                //     value: "log",
                //     formulaValue: "log",
                //     substitutionDiscovery: true,
                //     allowedForSelection: false,
                //     titleId: "operations.log.title",
                //     infoId: "operations.log.info"
                // }
            } as Record<string, IFormulaElementVO>,

            tasks: {

                [NumberId.TWO]: {
                    id: NumberId.TWO,
                    formulaElementId: NumberId.TWO,
                    isPredefined: true
                },
                [OperationId.SUBSTRACTION]: {
                    id: OperationId.SUBSTRACTION,
                    formulaElementId: OperationId.SUBSTRACTION,
                    requiredAvailableFormulaElementIds: [NumberId.TWO],
                    isPredefined: true
                },
                [NumberId.THREE]: {
                    id: NumberId.THREE,
                    formulaElementId: NumberId.THREE,
                    requiredAvailableFormulaElementIds: [NumberId.TWO],
                    isPredefined: true
                },
                [NumberId.FOUR]: {
                    id: NumberId.FOUR,
                    formulaElementId: NumberId.FOUR,
                    requiredAvailableFormulaElementIds: [NumberId.THREE],
                    isPredefined: true
                },
                [OperationId.MULTIPLICATION]: {
                    id: OperationId.MULTIPLICATION,
                    formulaElementId: OperationId.MULTIPLICATION,
                    requiredAvailableFormulaElementIds: [NumberId.TWO, NumberId.THREE, NumberId.SIX],
                    isPredefined: true
                },
                [NumberId.FIVE]: {
                    id: NumberId.FIVE,
                    formulaElementId: NumberId.FIVE,
                    requiredAvailableFormulaElementIds: [NumberId.FOUR],
                    isPredefined: true
                },
                [NumberId.SIX]: {
                    id: NumberId.SIX,
                    formulaElementId: NumberId.SIX,
                    requiredAvailableFormulaElementIds: [NumberId.FOUR],
                    isPredefined: true
                },
                [NumberId.SEVEN]: {
                    id: NumberId.SEVEN,
                    formulaElementId: NumberId.SEVEN,
                    requiredAvailableFormulaElementIds: [NumberId.SIX],
                    isPredefined: true
                },
                [OperationId.DIVISION]: {
                    id: OperationId.DIVISION,
                    formulaElementId: OperationId.DIVISION,
                    requiredAvailableFormulaElementIds: [OperationId.MULTIPLICATION],
                    isPredefined: true
                },
                [NumberId.EIGHT]: {
                    id: NumberId.EIGHT,
                    formulaElementId: NumberId.EIGHT,
                    requiredAvailableFormulaElementIds: [OperationId.DIVISION],
                    isPredefined: true
                },
                [NumberId.NINE]: {
                    id: NumberId.NINE,
                    formulaElementId: NumberId.NINE,
                    requiredAvailableFormulaElementIds: [OperationId.DIVISION],
                    isPredefined: true
                },
                [NumberId.ZERO]: {
                    id: NumberId.ZERO,
                    formulaElementId: NumberId.ZERO,
                    requiredAvailableFormulaElementIds: [OperationId.SUBSTRACTION],
                    isPredefined: true
                },
                [OperationId.EXPONENTIATION]: {
                    id: OperationId.EXPONENTIATION,
                    formulaElementId: OperationId.EXPONENTIATION,
                    requiredAvailableFormulaElementIds: [NumberId.TWO, NumberId.THREE, NumberId.EIGHT],
                    isPredefined: true
                },
                [OperationId.SQUARE_ROOT]: {
                    id: OperationId.SQUARE_ROOT,
                    formulaElementId: OperationId.SQUARE_ROOT,
                    requiredAvailableFormulaElementIds: [NumberId.NINE, NumberId.THREE],
                    isPredefined: true
                },
                [OperationId.FACTORIAL]: {
                    id: OperationId.FACTORIAL,
                    formulaElementId: OperationId.FACTORIAL,
                    requiredAvailableFormulaElementIds: [NumberId.SIX, NumberId.THREE],
                    isPredefined: true
                },
                [OperationId.DECIMAL_POINT]: {
                    id: OperationId.DECIMAL_POINT,
                    formulaElementId: OperationId.DECIMAL_POINT,
                    requiredAvailableFormulaElementIds: [NumberId.EIGHT, NumberId.FOUR, NumberId.ZERO, NumberId.FIVE],
                    isPredefined: true
                }
                // [OperationId.SINE]: {
                //     id: OperationId.SINE,
                //     formulaElementId: OperationId.SINE,
                //     requiredAvailableFormulaElementIds: [NumberId.NINE, NumberId.ZERO, NumberId.ONE]
                // },
                // [OperationId.COSINE]: {
                //     id: OperationId.COSINE,
                //     formulaElementId: OperationId.COSINE,
                //     requiredAvailableFormulaElementIds: [NumberId.ONE, NumberId.EIGHT, NumberId.ZERO, OperationId.SUBSTRACTION]
                // },
                // [OperationId.TANGENT]: {
                //     id: OperationId.TANGENT,
                //     formulaElementId: OperationId.TANGENT,
                //     requiredAvailableFormulaElementIds: [NumberId.ONE, NumberId.FOUR, NumberId.FIVE]
                // },
                // [OperationId.LOG]: {
                //     id: OperationId.LOG,
                //     formulaElementId: OperationId.LOG,
                //     requiredAvailableFormulaElementIds: [NumberId.ZERO, NumberId.ONE, NumberId.TWO]
                // }
            } as Record<string, IGameTaskVO>
        }
    }
};

export type GameLogicModuleState = typeof GameLogicModuleInitialState;