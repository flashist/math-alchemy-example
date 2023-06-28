import { BaseAppMediator } from "@flashist/appframework/base/mediators/BaseAppMediator";
import { GamePageView } from "./GamePageView";
import { appStateChangeEvent, appStorage } from "@flashist/appframework";
import { getInstance, InteractiveEvent } from "@flashist/flibs";
import { GameLogicModuleState } from "../../game-logic/data/state/GameLogicModuleState";
import { IFormulaElementVO } from "../../game-logic/data/formula/IFormulaElementVO";
import { GameLogicTools } from "../../game-logic/tools/GameLogicTools";
import { FormulaElementType } from "../../game-logic/data/formula/FormulaElementType";
import { RemoveLastFormulaElementCommand } from "../../game-logic/commands/formula/RemoveLastFormulaElementCommand";
import { ResetFormulaElementCommand } from "../../game-logic/commands/formula/ResetFormulaElementCommand";
import { ComputeCurrentFormulaCommand } from "../../game-logic/commands/formula/ComputeCurrentFormulaCommand";
import { GamePageModuleState } from "../data/state/GamePageModuleState";
import { IGameTaskVO } from "../../game-logic/data/tasks/IGameTaskVO";

export class GamePageMediator extends BaseAppMediator<GamePageView> {
    // protected soundsManager: SoundsManager = getInstance(SoundsManager);

    // protected reelsState = appStorage().getState<SlotReelsModuleState>();

    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);

    protected gameLogicState = appStorage().getState<GameLogicModuleState>();
    protected gamePageState = appStorage().getState<GamePageModuleState>();

    onActivatorStart(activator: GamePageView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.formulaBackspaceBtn,
            InteractiveEvent.DOWN,
            this.onFormulaBackspace
        );

        this.eventListenerHelper.addEventListener(
            this.activator.formulaResetBtn,
            InteractiveEvent.DOWN,
            this.onFormulaReset
        );

        this.eventListenerHelper.addEventListener(
            this.activator.formulaDiscoverBtn,
            InteractiveEvent.DOWN,
            this.onFormulaCompute
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GameLogicModuleState>()("gameLogic.dynamic.selectedElements"),
            this.commitSelectedFormulaData
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GameLogicModuleState>()("gameLogic.dynamic.openElementIds"),
            this.commitOpenFormulaElementsData
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GameLogicModuleState>()("gameLogic.dynamic.tasks.activeIds"),
            this.commitTasksData
        );

        this.commitOpenFormulaElementsData();
        this.commitSelectedFormulaData();
        this.commitTasksData();
    }

    protected onFormulaBackspace(): void {
        new RemoveLastFormulaElementCommand()
            .execute();
    }

    protected onFormulaReset(): void {
        new ResetFormulaElementCommand()
            .execute();
    }

    protected onFormulaCompute(): void {
        // this.gameLogicTools.computeCurrentFormula();
        new ComputeCurrentFormulaCommand()
            .execute();
    }

    protected commitSelectedFormulaData(): void {
        // const selectedElementsData: IFormulaElementVO[] = this.gameLogicTools.getFormulaElementsDataForCurrentSelectedElements();
        this.activator.setSelectedElements(this.gameLogicState.gameLogic.dynamic.selectedElements.concat());
    }

    protected commitOpenFormulaElementsData(): void {
        const numbersData: IFormulaElementVO[] = this.gameLogicTools.findFormulaElements({ ids: this.gameLogicState.gameLogic.dynamic.openElementIds, type: FormulaElementType.NUMBER, ordered: true, allowedForSelection: true });
        this.activator.setAvailableNumbers(numbersData);

        const operationsData: IFormulaElementVO[] = this.gameLogicTools.findFormulaElements({ ids: this.gameLogicState.gameLogic.dynamic.openElementIds, type: FormulaElementType.OPERATION, ordered: true, allowedForSelection: true });
        this.activator.setAvailableOperations(operationsData);
    }

    protected commitTasksData(): void {
        const newTasks: IGameTaskVO[] = this.gameLogicTools.getActiveTasksData();
        this.activator.setActiveTasks(newTasks);
    }

    // protected commitUiData(): void {
    //     if (this.gamePageState.gamePage.disableUi) {
    //         this.activator.spinBtn.enabled = false;
    //         this.activator.inventoryBtn.enabled = false;
    //         this.activator.encyclopediaBtn.enabled = false;
    //         this.activator.settingsBtn.enabled = false;

    //     } else {
    //         this.activator.spinBtn.enabled = true;
    //         this.activator.inventoryBtn.enabled = true;
    //         this.activator.encyclopediaBtn.enabled = true;
    //         this.activator.settingsBtn.enabled = true;
    //     }
    // }
}