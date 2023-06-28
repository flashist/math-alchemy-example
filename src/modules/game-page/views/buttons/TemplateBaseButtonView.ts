import { SimpleButtonConfig, SimpleButtonView } from "@flashist/appframework";
import { IFLabelConfig, Graphics, FLabel, FContainer } from "@flashist/flibs";
import { TemplateSettings } from "../../../../TemplateSettings";

export class TemplateBaseButtonView extends SimpleButtonView {

    protected btnCont: FContainer<any>;
    protected bg: Graphics;
    protected label: FLabel;

    protected construction(config: SimpleButtonConfig): void {
        super.construction(config);

        this.btnCont = new FContainer();

        this.label = new FLabel({
            fontFamily: TemplateSettings.fonts.mainFont,
            size: 64,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.btnCont.addChild(this.label);

        this.bg = new Graphics();
        this.btnCont.addChildAt(this.bg, 0);
        //
        this.bg.beginFill(TemplateSettings.colors.blue);
        this.bg.lineStyle(4, TemplateSettings.colors.beige, 1, 0);
        this.bg.drawRoundedRect(
            0,
            0,
            Math.floor(this.label.width + 80),
            Math.floor(this.label.height + 40),
            10
        );
        //
        this.label.x = this.bg.x + Math.floor((this.bg.width - this.label.width) / 2);
        this.label.y = this.bg.y + Math.floor((this.bg.height - this.label.height) / 2);
    }
}