import { Graphics, getText, Align } from "@flashist/flibs";
import { BaseAppView, SimpleButtonView } from "@flashist/appframework";
import { TemplateSettings } from "../../../../../TemplateSettings";

export class FormualErrorView extends BaseAppView {

    protected transpBg: Graphics;
    public btn: SimpleButtonView;

    protected construction(...args: any[]): void {
        super.construction(...args);

        this.transpBg = new Graphics();
        this.addChild(this.transpBg);
        //
        this.transpBg.beginFill(0x000000);
        this.transpBg.drawRect(0, 0, 10, 10);
        this.transpBg.alpha = 0;

        this.btn = new SimpleButtonView({
            labelConfig: {
                fontFamily: TemplateSettings.fonts.complexFontFamily,
                size: 96,
                color: TemplateSettings.colors.reddish,
                align: Align.CENTER,
                autosize: true
            },
            states: {
                normal: {
                    alpha: 0.75
                }
            },
            bgConfig: {
                contentToBgPaddingX: 10,
                contentToBgPaddingY: 10
            }
        });
        this.addChild(this.btn);
        // TEST
        this.btn.text = getText("errors.incorrectFormula");
    }

    protected arrange(): void {
        super.arrange();

        this.transpBg.width = this.resizeSize.x;
        this.transpBg.height = this.resizeSize.y;

        this.btn.x = this.transpBg.x + Math.floor((this.transpBg.width - this.btn.width) / 2);
        this.btn.y = this.transpBg.y + Math.floor((this.transpBg.height - this.btn.height) / 2);
    }
}