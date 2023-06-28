import { BaseAppView, SimpleButtonView, appStorage } from "@flashist/appframework";
import { Align, AutosizeType, FContainer, FLabel, Graphics, Point, getText } from "@flashist/flibs";
import { TemplateSettings } from "../../../../../TemplateSettings";
import { GamePageModuleState } from "../../../data/state/GamePageModuleState";

export class HelpPopupView extends BaseAppView {

    protected modalBg: Graphics;

    protected contentCont: FContainer;
    protected bg: Graphics;
    protected titleLabel: FLabel;
    protected infoLabel: FLabel;
    public closeBtn: SimpleButtonView;

    protected popupWidth: number;
    protected contentMaxWidth: number;

    protected construction(...args: any[]): void {
        super.construction(...args);

        this.popupWidth = 1280;
        this.contentMaxWidth = this.popupWidth - 80;

        this.modalBg = new Graphics();
        this.addChild(this.modalBg);
        //
        this.modalBg.beginFill(TemplateSettings.colors.black);
        this.modalBg.drawRect(0, 0, 10, 10);
        this.modalBg.alpha = 0.75;
        // To block clicking through the modal bg
        this.modalBg.interactive = true;

        this.contentCont = new FContainer();
        this.addChild(this.contentCont);

        this.bg = new Graphics();
        this.contentCont.addChild(this.bg);
        //
        // this.bg.beginFill(TemplateSettings.colors.black);
        // this.bg.lineStyle(8, TemplateSettings.colors.blue, 1, 0);
        // this.bg.drawRoundedRect(0, 0, 1280, 1280, 10);

        this.titleLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 128,
            color: TemplateSettings.colors.beige,
            align: Align.CENTER,
            autosize: true,
            autosizeType: AutosizeType.HEIGHT
        });
        this.contentCont.addChild(this.titleLabel);
        //
        this.titleLabel.text = getText("gamePage.popups.help.title");
        //
        this.titleLabel.alpha = 0.75;
        this.titleLabel.width = this.contentMaxWidth;

        this.infoLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 64,
            lineHeight: 86,
            color: TemplateSettings.colors.beige,
            align: Align.LEFT,
            autosize: true,
            autosizeType: AutosizeType.HEIGHT,
            wordWrap: true,

            maxAutosizeHeight: 2000,
            fitToSize: true,
            changeFontSizeToFit: true
        });
        this.contentCont.addChild(this.infoLabel);
        //
        this.infoLabel.width = this.contentMaxWidth;
        this.infoLabel.wordWrapWidth = this.contentMaxWidth;
        //
        this.infoLabel.text = getText("gamePage.popups.help.info");
        // TEST
        // this.discoveryInfoLabel.text = "-Two is the smallest and only even prime number. Because it forms the basis of a duality, it has religious and spiritual significance in many cultures.-";

        this.closeBtn = new SimpleButtonView({
            labelConfig: {
                fontFamily: TemplateSettings.fonts.mainFont,
                size: 64,
                color: TemplateSettings.colors.black,
                autosize: true
            },
            bgConfig: {
                bgColor: TemplateSettings.colors.beige,
                bgAlpha: 1,
                bgCornerRadius: 10,
                bgLineWidth: 4,
                bgLineColor: TemplateSettings.colors.black,
                bgLineAlpha: 1,
                contentToBgPaddingX: 30,
                contentToBgPaddingY: 15
            }
        });
        this.contentCont.addChild(this.closeBtn);
        //
        this.closeBtn.text = getText("gamePage.popups.help.closeBtn");
    }

    protected arrange(): void {
        super.arrange();

        this.modalBg.width = this.resizeSize.x;
        this.modalBg.height = this.resizeSize.y;

        this.titleLabel.x = Math.floor((this.popupWidth - this.titleLabel.width) / 2);
        this.titleLabel.y = 60;

        this.infoLabel.x = Math.floor((this.popupWidth - this.infoLabel.width) / 2);
        this.infoLabel.y = this.titleLabel.y + this.titleLabel.height + 30;

        this.closeBtn.x = Math.floor((this.popupWidth - this.closeBtn.width) / 2);
        this.closeBtn.y = this.infoLabel.y + this.infoLabel.height + 90;

        this.bg.clear();
        this.bg.beginFill(TemplateSettings.colors.black);
        this.bg.lineStyle(8, TemplateSettings.colors.beige, 1, 0);
        this.bg.drawRoundedRect(
            0,
            0,
            this.popupWidth,
            this.closeBtn.y + this.closeBtn.height + 60,
            20
        );

        this.contentCont.x = this.modalBg.x + Math.floor((this.modalBg.width - this.contentCont.width) / 2);
        this.contentCont.y = this.modalBg.y + Math.floor((this.modalBg.height - this.contentCont.height) / 2);
    }

}