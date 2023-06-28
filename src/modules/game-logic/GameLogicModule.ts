import { ECSManager } from "@flashist/appframework";
import { BaseAppModule } from "@flashist/appframework/base/modules/BaseAppModule";
import { appStorage } from "@flashist/appframework/state/AppStateModule";
import { serviceLocatorAdd, getInstance } from "@flashist/flibs";
import { GameLogicTools } from "./tools/GameLogicTools";
import { GameLogicModuleInitialState, GameLogicModuleState } from "./data/state/GameLogicModuleState";
import { OperationId } from "./data/formula/OperationId";
import { IFormulaElementVO } from "./data/formula/IFormulaElementVO";
import { GameTasksManager } from "./managers/GameTasksManager";
import { GameTasksTools } from "./tools/GameTasksTools";

export class GameLogicModule extends BaseAppModule {

    init(): void {
        super.init();

        appStorage().initializeWith(GameLogicModuleInitialState);
        // TEST
        (document as any).GameLogicModuleInitialState = GameLogicModuleInitialState;

        //
        // serviceLocatorAdd(HunterSystem, { isSingleton: true });

        // Tools
        serviceLocatorAdd(GameLogicTools, { isSingleton: true });
        serviceLocatorAdd(GameTasksTools, { isSingleton: true });
        // serviceLocatorAdd(GameSymbolInteractionTools, { isSingleton: true });

        // Managers
        serviceLocatorAdd(GameTasksManager, { isSingleton: true, forceCreation: true });
        // serviceLocatorAdd(SlotGameStateManager, { isSingleton: true, forceCreation: true });
        // serviceLocatorAdd(SlotGameSymbolWinValueAnimationsManager, { isSingleton: true, forceCreation: true });

        // Commands
        // serviceLocatorAdd(TemplateSlotReelsSpinBehaviourCommand, { toSubstitute: SlotReelsSpinBehaviourCommand });

        //
        // serviceLocatorAdd(GridSystem, { isSingleton: true });
    }
}