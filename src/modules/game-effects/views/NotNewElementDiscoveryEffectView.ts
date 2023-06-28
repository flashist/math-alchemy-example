import gsap from "gsap";

import { BaseAppView } from "@flashist/appframework";
import { AutosizeType, FLabel, Graphics, Align, FContainer, TimeoutTools } from "@flashist/flibs";
import { TemplateSettings } from "../../../TemplateSettings";

export class NotNewElementDiscoveryEffectView extends BaseAppView {

    protected contentCont: FContainer;
    protected bg: Graphics;
    protected infoLabel: FLabel;

    constructor(text: string) {
        super(text);
    }

    protected construction(text: string): void {
        super.construction();

        this.interactive = false;
        this.interactiveChildren = false;

        this.contentCont = new FContainer();
        this.addChild(this.contentCont);

        this.infoLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.mainFont,
            size: 64,
            color: TemplateSettings.colors.beige,
            align: Align.CENTER,
            autosize: true,
            autosizeType: AutosizeType.HEIGHT,
            wordWrap: true
        });
        this.contentCont.addChild(this.infoLabel);
        //
        this.infoLabel.text = text;
        //
        this.infoLabel.width = 1200;
        this.infoLabel.wordWrapWidth = this.infoLabel.width;

        this.bg = new Graphics();
        this.contentCont.addChildAt(this.bg, 0);
        //
        this.bg.lineStyle(8, TemplateSettings.colors.beige, 1, 0);
        this.bg.beginFill(TemplateSettings.colors.black);
        this.bg.drawRoundedRect(
            0,
            0,
            1280,
            this.infoLabel.height + 60,
            10
        );

        this.infoLabel.x = this.bg.x + Math.floor((this.bg.width - this.infoLabel.width) / 2);
        this.infoLabel.y = this.bg.y + Math.floor((this.bg.height - this.infoLabel.height) / 2);

        // this.contentCont.x = -1 * Math.floor(this.contentCont.width / 2);
        // this.contentCont.y = -1 * Math.floor(this.contentCont.height / 2);
    }

    public async showAndHide() {
        await this.show();
        await TimeoutTools.asyncTimeout(2000);
        await this.hide();
    }

    public async show() {
        await gsap.from(
            this.contentCont,
            {
                duration: 0.35,
                ease: "cubic.out",

                alpha: 0,
                y: this.contentCont.y + 120
            }
        );
    }

    public async hide() {
        await gsap.to(
            this.contentCont,
            {
                duration: 0.5,
                ease: "cubic.out",

                alpha: 0,
                y: this.contentCont.y - 240
            }
        );
    }
}