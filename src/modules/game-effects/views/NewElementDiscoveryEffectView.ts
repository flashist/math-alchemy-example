import gsap from "gsap";

import { BaseAppView } from "@flashist/appframework/base/views/BaseAppView";
import { NumberTools } from "@flashist/fcore";
import { DisplayTools, FContainer, Point, getInstance } from "@flashist/flibs";
import { GameLogicTools } from "../../game-logic/tools/GameLogicTools";
import { INewElementDiscoveryEffectConfigVO } from "./INewElementDiscoveryEffectConfigVO";
import { SelectFormulaElementView } from "../../game-page/views/formula/select/SelectFormulaElementView";

export class NewElementDiscoveryEffectView extends BaseAppView {

    protected gameLogicTools: GameLogicTools;

    protected config: INewElementDiscoveryEffectConfigVO;

    protected elementCont: FContainer;
    protected elementView: SelectFormulaElementView;

    constructor(config: INewElementDiscoveryEffectConfigVO) {
        super(config);
    }

    protected construction(config: INewElementDiscoveryEffectConfigVO) {
        super.construction();

        this.config = config;

        this.gameLogicTools = getInstance(GameLogicTools);

        this.elementCont = new FContainer();
        this.addChild(this.elementCont);

        this.elementView = getInstance(SelectFormulaElementView);
        this.elementCont.addChild(this.elementView);
        //
        this.elementView.data = this.gameLogicTools.findFormulaElements({ ids: [this.config.elementId] })[0];
        this.elementView.interactive = false;
        this.elementView.interactiveChildren = false;
        //
        this.elementView.x = -this.elementView.width / 2;
        this.elementView.y = -this.elementView.height / 2;
    }

    public async show(): Promise<void> {

        const startLocalPos: Point = this.elementCont.parent.toLocal(this.config.startGlobalPos);
        const endLocalPos: Point = this.elementCont.parent.toLocal(this.config.endGlobalPos);

        // X: rand
        let xRand: number = NumberTools.getRandomFloat(100, 200);
        if (Math.random() < 0.5) {
            xRand *= -1;
        }
        // Y: rand
        let yRand: number = NumberTools.getRandomFloat(-500, -1000);
        //
        const midLocalPos: Point = new Point(
            startLocalPos.x + xRand,
            startLocalPos.y + yRand
        );

        this.elementCont.x = startLocalPos.x;
        this.elementCont.y = startLocalPos.y;
        //
        gsap.to(
            this.elementCont,
            {
                duration: 0.05,
                delay: 0.4,
                alpha: 0
            }
        );
        //
        gsap.to(
            this.elementCont.scale,
            {
                duration: 0.25,
                ease: "circ.out",
                x: 3,
                y: 3
            }
        );
        //
        await gsap.to(
            this.elementCont,
            {
                duration: 0.25,
                ease: "circ.out",
                x: midLocalPos.x,
                y: midLocalPos.y
            }
        );
        //
        gsap.to(
            this.elementCont.scale,
            {
                duration: 0.25,
                ease: "circ.inOut",
                x: 1,
                y: 1
            }
        );
        //
        await gsap.to(
            this.elementCont,
            {
                duration: 0.25,
                ease: "circ.inOut",
                x: endLocalPos.x,
                y: endLocalPos.y
            }
        );
    }

    public hide(): void {
        DisplayTools.childRemoveItselfFromParent(this);
    }
}