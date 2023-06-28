import { BaseAppCommand, ContainersManager, appStorage } from "@flashist/appframework";
import { FContainer, getInstance } from "@flashist/flibs";
import { NewElementDiscoveryEffectView } from "../../game-effects/views/NewElementDiscoveryEffectView";
import { ScaledEffectsContainerId } from "../data/ScaledEffectsContainerId";
import { GamePageModuleState } from "../data/state/GamePageModuleState";
import { IFormulaElementVO } from "../../game-logic/data/formula/IFormulaElementVO";
import { GameLogicTools } from "../../game-logic/tools/GameLogicTools";
import { FormulaElementType } from "../../game-logic/data/formula/FormulaElementType";
import { GameLogicModuleState } from "../../game-logic/data/state/GameLogicModuleState";

export class ShowNewElementDiscoveryAnimationCommand extends BaseAppCommand {

    protected gamePageState = appStorage().getState<GamePageModuleState>();
    protected gameLogicTools = getInstance(GameLogicTools);

    protected elementId: string;

    constructor(elementId: string) {
        super();

        this.elementId = elementId;
    }

    protected async executeInternal() {
        const elementData: IFormulaElementVO = this.gameLogicTools.findFormulaElements({ ids: [this.elementId] })[0];
        let endGlobalPos = this.gamePageState.gamePage.numbersListGlobalPos;
        if (elementData.type === FormulaElementType.OPERATION) {
            endGlobalPos = this.gamePageState.gamePage.operationsListGlobalPos;
        }

        const containersManager: ContainersManager = getInstance(ContainersManager);
        const effectsCont: FContainer = containersManager.getContainer(ScaledEffectsContainerId);
        const splash: NewElementDiscoveryEffectView = new NewElementDiscoveryEffectView({
            elementId: this.elementId,
            startGlobalPos: this.gamePageState.gamePage.popups.newDiscovery.collectBtnGlobalPos,
            endGlobalPos: endGlobalPos
        });
        effectsCont.addChild(splash);
        //
        await splash.show();
        splash.hide();

        this.notifyComplete();
    }
}