import { BaseAppMediator } from "@flashist/appframework/base/mediators/BaseAppMediator";
import { appStateChangeEvent, appStorage } from "@flashist/appframework";
import { getInstance, InteractiveEvent } from "@flashist/flibs";
import { NewDiscoveryPopupView } from "./NewDiscoveryPopupView";
import { GameLogicTools } from "../../../../game-logic/tools/GameLogicTools";
import { GameLogicModuleState } from "../../../../game-logic/data/state/GameLogicModuleState";
import { GamePageModuleState } from "../../../data/state/GamePageModuleState";
import { ShowNewElementDiscoveryAnimationCommand } from "../../../commands/ShowNewElementDiscoveryAnimationCommand";
import { ResetFormulaElementCommand } from "../../../../game-logic/commands/formula/ResetFormulaElementCommand";

export class NewDiscoveryPopupMediator extends BaseAppMediator<NewDiscoveryPopupView> {

    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);
    protected gameLogicState = appStorage().getState<GameLogicModuleState>();
    protected gamePageState = appStorage().getState<GamePageModuleState>();

    onActivatorStart(activator: NewDiscoveryPopupView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GamePageModuleState>()("gamePage.popups.newDiscovery"),
            this.commitPopupData
        );

        this.eventListenerHelper.addEventListener(
            this.activator.collectBtn,
            InteractiveEvent.DOWN,
            this.onCollect
        );

        this.commitPopupData();
    }

    protected async onCollect() {
        new ResetFormulaElementCommand()
            .execute();

        appStorage().change<GamePageModuleState>()("gamePage.popups.newDiscovery.visible", false);

        if (this.activator.data.allowedForSelection) {
            await new ShowNewElementDiscoveryAnimationCommand(this.activator.data.id)
                .execute();
        }

        appStorage().push<GameLogicModuleState>()(
            "gameLogic.dynamic.openElementIds",
            this.activator.data.id
        );
    }

    protected commitPopupData(): void {
        this.activator.visible = this.gamePageState.gamePage.popups.newDiscovery.visible;
        this.activator.data = this.gameLogicTools.findFormulaElements({ ids: [this.gamePageState.gamePage.popups.newDiscovery.formulaElementId] })[0];
    }
}