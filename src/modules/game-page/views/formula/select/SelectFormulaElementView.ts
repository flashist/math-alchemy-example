import { FContainer, FLabel, Graphics, getText } from "@flashist/flibs";
import { BaseAppView, SimpleButtonView } from "@flashist/appframework";
import { TemplateSettings } from "../../../../../TemplateSettings";
import { IFormulaElementVO } from "../../../../game-logic/data/formula/IFormulaElementVO";

export class SelectFormulaElementView extends BaseAppView<IFormulaElementVO> {

    protected btn: SimpleButtonView;

    protected contentCont: FContainer;
    protected label: FLabel;
    protected bg: Graphics;

    protected construction(...args: any[]): void {
        super.construction(...args);

        this.interactive = true;

        this.btn = new SimpleButtonView({
            states: {
                normal: {
                    alpha: 0.5
                }
            }
        });
        this.addChild(this.btn);


        this.contentCont = new FContainer();
        this.btn.addExternalView(this.contentCont);

        this.bg = new Graphics();
        this.contentCont.addChild(this.bg);
        //
        // 0.01 is needed to be almost invisible, yet clickable
        this.bg.beginFill(0xFFFFFF, 0.01);
        this.bg.lineStyle(4, TemplateSettings.colors.beige, 1, 0);
        this.bg.drawRoundedRect(0, 0, 160, 160, 10);

        this.label = new FLabel({
            fontFamily: TemplateSettings.fonts.mainFont,
            size: 128,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.contentCont.addChild(this.label);
    }

    // public get text(): string {
    //     return this._text;
    // }
    // public set text(value: string) {
    //     this._text = value;

    //     this.commitData();
    // }

    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        this.label.text = this.data.value;

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.label.x = this.bg.x + Math.floor((this.bg.width - this.label.width) / 2);
        this.label.y = this.bg.y + Math.floor((this.bg.height - this.label.height) / 2);
    }
}