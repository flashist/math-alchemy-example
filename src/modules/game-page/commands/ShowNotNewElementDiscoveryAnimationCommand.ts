import { BaseAppCommand, ContainersManager, RendererManager } from "@flashist/appframework";
import { FContainer, Point, getInstance, getText } from "@flashist/flibs";
import { NotNewElementDiscoveryEffectView } from "../../game-effects/views/NotNewElementDiscoveryEffectView";
import { GameLogicTools } from "../../game-logic/tools/GameLogicTools";
import { ScaledEffectsContainerId } from "../data/ScaledEffectsContainerId";

export class ShowNotNewElementDiscoveryAnimationCommand extends BaseAppCommand {

    protected gameTools: GameLogicTools = getInstance(GameLogicTools);

    protected elementValue: string;
    protected globalY: number;

    constructor(elementValue: string, globalY: number) {
        super();

        this.elementValue = elementValue;
        this.globalY = globalY;
    }

    protected async executeInternal() {
        const containersManager: ContainersManager = getInstance(ContainersManager);
        const effectsCont: FContainer = containersManager.getContainer(ScaledEffectsContainerId);
        //
        // const elementData: IFormulaElementVO = this.gameTools.getFormulaElementsDataByIds([this.elementValue])[0];
        // const tempText: string = getText("gamePage.oldElementDiscoveryHint", { result: elementData.value })
        const tempText: string = getText("gamePage.oldElementDiscoveryHint", { result: this.elementValue });
        const splash: NotNewElementDiscoveryEffectView = new NotNewElementDiscoveryEffectView(tempText);
        effectsCont.addChild(splash);
        //
        const rendererManager: RendererManager = getInstance(RendererManager);
        const globalX: number = rendererManager.rendererWidth / 2;
        //
        const localPos: Point = splash.parent.toLocal(new Point(globalX, this.globalY));
        splash.x = localPos.x - Math.floor(splash.width / 2);
        splash.y = localPos.y - Math.floor(splash.height / 2) - 240;
        //
        await splash.showAndHide();

        this.notifyComplete();
    }

}