import { appStateChangeEvent, appStorage } from "@flashist/appframework";
import { BaseAppMediator } from "@flashist/appframework/base/mediators/BaseAppMediator";
import { InteractiveEvent } from "@flashist/flibs";
import { GamePageModuleState } from "../../../data/state/GamePageModuleState";
import { HelpPopupView } from "./HelpPopupView";

export class HelpPopupMediator extends BaseAppMediator<HelpPopupView> {

    protected gamePageState = appStorage().getState<GamePageModuleState>();

    onActivatorStart(activator: HelpPopupView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GamePageModuleState>()("gamePage.popups.help"),
            this.commitPopupData
        );

        this.eventListenerHelper.addEventListener(
            this.activator.closeBtn,
            InteractiveEvent.DOWN,
            this.onClose
        );

        this.commitPopupData();
    }

    protected onClose(): void {
        appStorage().change<GamePageModuleState>()("gamePage.popups.help.visible", false);
    }

    protected commitPopupData(): void {
        this.activator.visible = this.gamePageState.gamePage.popups.help.visible;
    }
}