import { FContainer, getInstance } from "@flashist/flibs";
import { BaseAppCommand, ContainersManager, appStateChangeEvent, appStorage } from "@flashist/appframework";
import { SplashEffectView } from "../../effects/views/SplashEffectView";
import { TemplateSettings } from "../../../TemplateSettings";
import { EffectsContainerId } from "../../effects/data/EffectsContainerId";
import { GamePageModuleState } from "../data/state/GamePageModuleState";

export class ShowNewDiscoveryPopupCommand extends BaseAppCommand {

    protected elementId: string;

    constructor(elementId: string) {
        super();

        this.elementId = elementId;
    }

    protected async executeInternal() {
        const containersManager: ContainersManager = getInstance(ContainersManager);
        const effectsCont: FContainer = containersManager.getContainer(EffectsContainerId);
        const splash: SplashEffectView = new SplashEffectView({ color: TemplateSettings.colors.white });
        effectsCont.addChild(splash);
        //
        await splash.show();

        appStorage().change<GamePageModuleState>()(
            "gamePage.popups.newDiscovery",
            {
                visible: true,
                formulaElementId: this.elementId
            }
        );

        splash.hide();

        this.notifyComplete();
    }

}