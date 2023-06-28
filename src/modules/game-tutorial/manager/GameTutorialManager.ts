import { BaseAppManager } from "@flashist/appframework/base/managers/BaseAppManager";
import { appStorage, appStateChangeEvent } from "@flashist/appframework";
import { getInstance, TimeoutTools } from "@flashist/flibs";
import { GameLogicModuleState } from "../../game-logic/data/state/GameLogicModuleState";
import { IFormulaElementVO } from "../../game-logic/data/formula/IFormulaElementVO";
import { GamePageModuleState } from "../../game-page/data/state/GamePageModuleState";
import { TutorialManager } from "../../tutorial/managers/TutorialManager";
import { GamePageGlobalEvent } from "../../game-page/views/GamePageGlobalEvent";
import { GameTutorialStepId } from "../data/steps/GameTutorialStepId";
import { SelectFormulaElementGlobalEvent } from "../../game-page/views/formula/select/SelectFormulaElementGlobalEvent";
import { NumberId } from "../../game-logic/data/formula/NumberId";
import { OperationId } from "../../game-logic/data/formula/OperationId";

export class GameTutorialManager extends BaseAppManager {

    protected gamePageState = appStorage().getState<GamePageModuleState>();
    protected gameLogicState = appStorage().getState<GameLogicModuleState>();
    protected tutorialManager: TutorialManager = getInstance(TutorialManager);

    protected addListeners() {
        super.addListeners();

        // TEST
        // return;

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            GamePageGlobalEvent.FIRST_INIT_COMPLETE,
            async () => {

                // Next frame timeout is needed to make sure other views are initiated
                await TimeoutTools.asyncTimeout(0);

                // Number
                if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.DISCOVER_NUMBER_WELCOME)) {

                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_WELCOME);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_1);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_ADDITION);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_1_SECOND);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_EQUAL);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_QUESTION);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_PRESS_DISCOVER);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_NUMBER_RESULT);

                    // await this.tutorialManager.startStep(GameTutorialStepId.EDIT_INFO);
                }

                // Operation
                if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.DISCOVER_OPERATION_WELCOME)) {
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_WELCOME);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_2);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_QUESTION);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_1);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_EQUAL);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_1_SECOND);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_PRESS_DISCOVER);
                    await this.tutorialManager.startStep(GameTutorialStepId.DISCOVER_OPERATION_RESULT);
                }

                // Tasks
                if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.TASKS_INFO)) {
                    await this.tutorialManager.startStep(GameTutorialStepId.TASKS_INFO);
                }
            }
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            SelectFormulaElementGlobalEvent.ELEMENT_SELECTED,
            (data: IFormulaElementVO) => {
                if (data.id === NumberId.ONE) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_SELECT_1)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_1);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_SELECT_1_SECOND)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_1_SECOND);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_SELECT_1)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_1);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_SELECT_1_SECOND)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_1_SECOND);
                    }
                }

                if (data.id === NumberId.TWO) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_SELECT_2)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_2);
                    }
                }

                if (data.id === OperationId.ADDITION) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_SELECT_ADDITION)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_ADDITION);
                    }
                }

                if (data.id === OperationId.EQUAL) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_SELECT_EQUAL)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_EQUAL);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_SELECT_EQUAL)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_EQUAL);
                    }
                }

                if (data.id === OperationId.QUESTION) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_SELECT_QUESTION)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_SELECT_QUESTION);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_SELECT_QUESTION)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_SELECT_QUESTION);
                    }
                }
            }
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GamePageModuleState>()("gamePage.popups.newDiscovery.visible"),
            () => {
                if (this.gamePageState.gamePage.popups.newDiscovery.visible) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_PRESS_DISCOVER)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_PRESS_DISCOVER);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_PRESS_DISCOVER)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_PRESS_DISCOVER);
                    }

                } else {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_NUMBER_RESULT)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_NUMBER_RESULT);
                    }
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.DISCOVER_OPERATION_RESULT)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.DISCOVER_OPERATION_RESULT);
                    }
                }
            }
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GamePageModuleState>()("gamePage.formulaError.visible"),
            () => {
                if (this.gamePageState.gamePage.formulaError.visible) {
                    if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.ERROR_INFO)) {
                        this.tutorialManager.startStep(GameTutorialStepId.ERROR_INFO);
                    }
                }
            }
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GamePageModuleState>()("gamePage.popups.help.visible"),
            async () => {
                if (this.gamePageState.gamePage.popups.help.visible) {
                    if (this.tutorialManager.checkIfStepActive(GameTutorialStepId.ERROR_INFO)) {
                        this.tutorialManager.completeStep(GameTutorialStepId.ERROR_INFO);
                    }
                }

                if (!this.gamePageState.gamePage.popups.help.visible) {
                    await TimeoutTools.asyncTimeout(0);
                    if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.EDIT_INFO)) {
                        this.tutorialManager.startStep(GameTutorialStepId.EDIT_INFO);
                    }
                }
            }
        );

        // this.eventListenerHelper.addEventListener(
        //     this.globalDispatcher,
        //     appStateChangeEvent<GamePageModuleState>()("gamePage.popups.mission"),
        //     async () => {

        //         // Next frame timeout is needed to make sure other views are initiated
        //         await TimeoutTools.asyncTimeout(0);

        //         if (this.gamePageState.gamePage.popups.mission) {
        //             if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.FIRST_MISSION_GOAL)) {
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_MISSION_GOAL);
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_MISSION_CLOSE);
        //             }

        //         // When the mission popup closed for the 1st time
        //         } else {
        //             await this.tutorialManager.startStep(GameTutorialStepId.FIRST_SPIN);
        //         }
        //     }
        // );

        // this.eventListenerHelper.addEventListener(
        //     this.globalDispatcher,
        //     appStateChangeEvent<GamePageModuleState>()("gamePage.popups.addSymbol"),
        //     async () => {
        //         // Next frame timeout is needed to make sure other views are initiated
        //         await TimeoutTools.asyncTimeout(0);

        //         if (this.gamePageState.gamePage.popups.addSymbol.visible) {
        //             if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.FIRST_ADD_SYMBOL_INTRO)) {
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_ADD_SYMBOL_INTRO);
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_ADD_SYMBOL_SINGLE_SYMBOL_VALUE);
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_ADD_SYMBOL_SINGLE_SYMBOL_DESC);
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_ADD_SYMBOL_ACTION);

        //             } else if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.FIRST_MISSION_BONUS_REROLLS)) {
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_MISSION_BONUS_REROLLS);
        //             }

        //         } else {
        //             if (this.tutorialManager.checkIfStepCanBeStarted(GameTutorialStepId.FIRST_REMOVE_INTRO)) {
        //                 const nonEmptySymbols: string[] = this.gameSymbolTools.findAvailableSymbols([GameSymbolId.EMPTY]);
        //                 if (nonEmptySymbols.length > this.gameSymbolTools.getOnReelsSymbolsTotalCount()) {
        //                     await this.tutorialManager.startStep(GameTutorialStepId.FIRST_REMOVE_INTRO);
        //                 }
        //             }
        //         }
        //     }
        // );


        // this.eventListenerHelper.addEventListener(
        //     this.globalDispatcher,
        //     appStateChangeEvent<GamePageModuleState>()("gamePage.popups.missionBonus"),
        //     async () => {
        //         // Next frame timeout is needed to make sure other views are initiated
        //         await TimeoutTools.asyncTimeout(0);

        //         if (this.gamePageState.gamePage.popups.missionBonus) {
        //             await this.tutorialManager.startStep(GameTutorialStepId.FIRST_MISSION_BONUS_INTRO);
        //         }
        //     }
        // );

        // this.eventListenerHelper.addEventListener(
        //     this.globalDispatcher,
        //     appStateChangeEvent<GamePageModuleState>()("gamePage.popups.inventory"),
        //     async () => {
        //         // Next frame timeout is needed to make sure other views are initiated
        //         await TimeoutTools.asyncTimeout(0);

        //         if (this.gamePageState.gamePage.popups.inventory) {
        //             await this.tutorialManager.startStep(GameTutorialStepId.FIRST_REMOVE_SYMBOL_INFO);
        //         }
        //     }
        // );

        // this.eventListenerHelper.addEventListener(
        //     this.globalDispatcher,
        //     appStateChangeEvent<GamePageModuleState>()("gamePage.popups.companionSymbolInfo.visible"),
        //     async () => {
        //         // Next frame timeout is needed to make sure other views are initiated
        //         await TimeoutTools.asyncTimeout(0);

        //         if (this.gamePageState.gamePage.popups.companionSymbolInfo.visible) {
        //             if (this.gameLogicState.gameLogic.dynamic.removes > 0) {
        //                 await this.tutorialManager.startStep(GameTutorialStepId.FIRST_REMOVE_SINGLE_SYMBOL_REMOVE_BUTTON);
        //             }
        //         }
        //     }
        // );
    }
}