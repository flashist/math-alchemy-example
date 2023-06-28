import { FContainer, getInstance } from "@flashist/flibs";
import { BaseAppCommand, ContainersManager, appStateChangeEvent, appStorage } from "@flashist/appframework";
import { SplashEffectView } from "../../effects/views/SplashEffectView";
import { TemplateSettings } from "../../../TemplateSettings";
import { EffectsContainerId } from "../../effects/data/EffectsContainerId";
import { GamePageModuleState } from "../data/state/GamePageModuleState";
import { GameAnalyticsEvent } from "../../game-analytics/GameAnalyticsEvent";
import { Analytics } from "../../analytics/Analytics";

export class ShowFormulaErrorCommand extends BaseAppCommand {

    protected errorId: string;
    protected curFormula: string;

    constructor(errorId: string, curFormula: string) {
        super();

        this.errorId = errorId;
        this.curFormula = curFormula;
    }

    protected async executeInternal() {
        Analytics.logEvent(
            GameAnalyticsEvent.FORMULA_ERROR,
            {
                errorId: this.errorId,
                formula: this.curFormula
            }
        );

        const containersManager: ContainersManager = getInstance(ContainersManager);
        const effectsCont: FContainer = containersManager.getContainer(EffectsContainerId);
        const splash: SplashEffectView = new SplashEffectView({ color: TemplateSettings.colors.reddish });
        effectsCont.addChild(splash);
        //
        await splash.show();

        appStorage().change<GamePageModuleState>()(
            "gamePage.formulaError",
            {
                visible: true,
                errorId: `errors.${this.errorId}`
            }
        );

        splash.hide();

        this.notifyComplete();
    }

}