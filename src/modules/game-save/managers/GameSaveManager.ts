import { LocalStorageManager } from "@flashist/appframework";
import { BaseAppManager } from "@flashist/appframework/base/managers/BaseAppManager";
import { appStateChangeEvent, appStorage } from "@flashist/appframework/state/AppStateModule";
import { getInstance } from "@flashist/flibs";
import { GameLogicModuleState } from "../../game-logic/data/state/GameLogicModuleState";
import { GameSaveParamId } from "../data/GameSaveParamId";
import { GameSaveStorageVO } from "../data/state/GameSaveStorageInitialVO";

export class GameSaveManager extends BaseAppManager {

    protected storageManager: LocalStorageManager = getInstance(LocalStorageManager);

    protected gameLogicState = appStorage().getState<GameLogicModuleState>();

    protected addListeners() {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GameLogicModuleState>()("gameLogic.dynamic"),
            this.updateSaveData
        );
    }

    protected updateSaveData(): void {
        const newSavedState: GameSaveStorageVO = {
            gameLogic: {
                dynamic: {
                    openElementIds: this.gameLogicState.gameLogic.dynamic.openElementIds.concat(),
                    tasks: {
                        activeIds: this.gameLogicState.gameLogic.dynamic.tasks.activeIds.concat(),
                        completeIds: this.gameLogicState.gameLogic.dynamic.tasks.completeIds.concat()
                    }
                }
            }
        };

        this.storageManager.setParam(GameSaveParamId, newSavedState);
    }
}