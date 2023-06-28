import { GameTutorialStepId } from "../steps/GameTutorialStepId";
import { GameViewId } from "../../../game-page/views/GameViewId";
import { Align, VAlign } from "@flashist/flibs";
import { ITutorialStepConfigVO } from "../../../tutorial/data/state/ITutorialStepConfigVO";

export const GameTutorialModuleInitialState = {
    tutorial: {
        static: {
            steps: {

                // Discover Number
                [GameTutorialStepId.DISCOVER_NUMBER_WELCOME]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_WELCOME,
                    textId: "tutorial.steps.discoverNumberWelcome",
                    // viewId: GameViewId.MISSION_POPUP_GOAL,
                    valign: VAlign.MIDDLE,
                    labelAlign: Align.CENTER,

                    minTimeToDisplayMs: 1000,
                    completeOnStageDown: true,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_SELECT_1]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_SELECT_1,

                    textId: "tutorial.steps.discoverNumberSelect1",
                    viewId: GameViewId.SELECT_ELEMENT_1,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_SELECT_ADDITION]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_SELECT_ADDITION,

                    textId: "tutorial.steps.discoverNumberSelectPlus",
                    viewId: GameViewId.SELECT_ELEMENT_ADDITION,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_SELECT_1_SECOND]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_SELECT_1_SECOND,

                    textId: "tutorial.steps.discoverNumberSelect1Second",
                    viewId: GameViewId.SELECT_ELEMENT_1,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_SELECT_EQUAL]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_SELECT_EQUAL,

                    textId: "tutorial.steps.discoverNumberSelectEqual",
                    viewId: GameViewId.SELECT_ELEMENT_EQUAL,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_SELECT_QUESTION]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_SELECT_QUESTION,

                    textId: "tutorial.steps.discoverNumberSelectQuestion",
                    viewId: GameViewId.SELECT_ELEMENT_QUESTION,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_PRESS_DISCOVER]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_PRESS_DISCOVER,

                    textId: "tutorial.steps.discoverNumberPressDiscover",
                    viewId: GameViewId.FORMULA_AND_DISCOVER_AREA,
                    targetViewHolePadding: 5,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_NUMBER_RESULT]: {
                    id: GameTutorialStepId.DISCOVER_NUMBER_RESULT,
                    completeSaveStepId: GameTutorialStepId.DISCOVER_NUMBER_WELCOME,

                    textId: "tutorial.steps.discoverNumberResult",
                    viewId: GameViewId.NEW_DISCOVERY_POPUP_CONTENT,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },

                // Discover Operation
                [GameTutorialStepId.DISCOVER_OPERATION_WELCOME]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_WELCOME,
                    textId: "tutorial.steps.discoverOperationWelcome",
                    valign: VAlign.MIDDLE,
                    labelAlign: Align.CENTER,

                    // minTimeToDisplayMs: 1000,
                    completeOnStageDown: true,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_SELECT_2]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_SELECT_2,

                    textId: "tutorial.steps.discoverOperationSelect2",
                    viewId: GameViewId.SELECT_ELEMENT_2,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_SELECT_QUESTION]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_SELECT_QUESTION,

                    textId: "tutorial.steps.discoverOperationSelectQestion",
                    viewId: GameViewId.SELECT_ELEMENT_QUESTION,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_SELECT_1]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_SELECT_1,

                    textId: "tutorial.steps.discoverOperationSelect1",
                    viewId: GameViewId.SELECT_ELEMENT_1,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_SELECT_EQUAL]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_SELECT_EQUAL,

                    textId: "tutorial.steps.discoverOperationSelectEqual",
                    viewId: GameViewId.SELECT_ELEMENT_EQUAL,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_SELECT_1_SECOND]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_SELECT_1_SECOND,

                    textId: "tutorial.steps.discoverOperationSelect1Second",
                    viewId: GameViewId.SELECT_ELEMENT_1,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_PRESS_DISCOVER]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_PRESS_DISCOVER,

                    textId: "tutorial.steps.discoverOperationPressDiscover",
                    viewId: GameViewId.FORMULA_AND_DISCOVER_AREA,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },
                [GameTutorialStepId.DISCOVER_OPERATION_RESULT]: {
                    id: GameTutorialStepId.DISCOVER_OPERATION_RESULT,
                    completeSaveStepId: GameTutorialStepId.DISCOVER_OPERATION_WELCOME,

                    textId: "tutorial.steps.discoverOperationResult",
                    viewId: GameViewId.NEW_DISCOVERY_POPUP_CONTENT,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,
                    blocking: true
                },

                // Step 3: Tasks
                [GameTutorialStepId.TASKS_INFO]: {
                    id: GameTutorialStepId.TASKS_INFO,
                    completeSaveStepId: GameTutorialStepId.TASKS_INFO,
                    textId: "tutorial.steps.tasksInfo",
                    viewId: GameViewId.TASKS,
                    valign: VAlign.BOTTOM,
                    labelAlign: Align.CENTER,
                    // stepInfoToViewPaddingY: 40,

                    completeOnStageDown: true,
                    blocking: true
                },

                // Step 4: Error
                [GameTutorialStepId.ERROR_INFO]: {
                    id: GameTutorialStepId.ERROR_INFO,
                    completeSaveStepId: GameTutorialStepId.ERROR_INFO,
                    requiredCompleteStepIds: [GameTutorialStepId.TASKS_INFO],
                    textId: "tutorial.steps.errorInfo",
                    viewId: GameViewId.FORMULA_ERROR,
                    valign: VAlign.BOTTOM,
                    labelAlign: Align.CENTER,

                    // completeOnStageDown: true,
                    blocking: true
                },

                // Step 5: Edit
                [GameTutorialStepId.EDIT_INFO]: {
                    id: GameTutorialStepId.EDIT_INFO,
                    requiredCompleteStepIds: [GameTutorialStepId.ERROR_INFO],
                    textId: "tutorial.steps.editInfo",
                    viewId: GameViewId.EDIT_AREA,
                    valign: VAlign.TOP,
                    labelAlign: Align.CENTER,

                    completeOnStageDown: true,
                    blocking: true
                },

            } as Record<string, ITutorialStepConfigVO>
        }
    }
}