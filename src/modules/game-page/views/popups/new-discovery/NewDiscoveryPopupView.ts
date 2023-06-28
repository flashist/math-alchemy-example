import { BaseAppView, ContainersManager, SimpleButtonView, appStorage } from "@flashist/appframework";
import { FContainer, Graphics, FLabel, getText, AutosizeType, Align, Point, getInstance } from "@flashist/flibs";
import { TemplateSettings } from "../../../../../TemplateSettings";
import { IFormulaElementVO } from "../../../../game-logic/data/formula/IFormulaElementVO";
import { GamePageModuleState } from "../../../data/state/GamePageModuleState";
import { GameViewId } from "../../GameViewId";

export class NewDiscoveryPopupView extends BaseAppView<IFormulaElementVO> {

    protected containersManager: ContainersManager;

    protected modalBg: Graphics;

    protected contentCont: FContainer;
    protected bg: Graphics;
    protected titleLabel: FLabel;
    protected discoveryTitleLabel: FLabel;
    protected discoveryInfoLabel: FLabel;
    public collectBtn: SimpleButtonView;

    protected popupWidth: number;
    protected contentMaxWidth: number;

    protected construction(...args: any[]): void {
        super.construction(...args);

        this.containersManager = getInstance(ContainersManager);

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
        this.titleLabel.text = getText("gamePage.popups.newDiscovery.title");
        //
        this.titleLabel.alpha = 0.75;
        this.titleLabel.width = this.contentMaxWidth;

        this.discoveryTitleLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 384,
            color: TemplateSettings.colors.beige,
            align: Align.CENTER,
            autosize: true,
            autosizeType: AutosizeType.HEIGHT,
            wordWrap: true,
        });
        this.contentCont.addChild(this.discoveryTitleLabel);
        //
        this.discoveryTitleLabel.width = this.contentMaxWidth;
        // TEST
        // this.discoveryTitleLabel.text = "-2-";

        this.discoveryInfoLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 64,
            color: TemplateSettings.colors.beige,
            align: Align.CENTER,
            autosize: true,
            autosizeType: AutosizeType.HEIGHT,
            wordWrap: true
        });
        this.contentCont.addChild(this.discoveryInfoLabel);
        //
        this.discoveryInfoLabel.alpha = 0.75;
        this.discoveryInfoLabel.width = this.contentMaxWidth;
        this.discoveryInfoLabel.wordWrapWidth = this.contentMaxWidth;
        // TEST
        // this.discoveryInfoLabel.text = "-Two is the smallest and only even prime number. Because it forms the basis of a duality, it has religious and spiritual significance in many cultures.-";

        this.collectBtn = new SimpleButtonView({
            labelConfig: {
                fontFamily: TemplateSettings.fonts.mainFont,
                size: 64,
                color: TemplateSettings.colors.beige,
                autosize: true
            },
            bgConfig: {
                bgColor: TemplateSettings.colors.blue,
                bgAlpha: 1,
                bgCornerRadius: 10,
                bgLineWidth: 4,
                bgLineColor: TemplateSettings.colors.beige,
                bgLineAlpha: 1,
                contentToBgPaddingX: 30,
                contentToBgPaddingY: 15
            }
        });
        this.contentCont.addChild(this.collectBtn);
        //
        this.collectBtn.text = getText("gamePage.popups.newDiscovery.collectBtn");

        //
        this.containersManager.addContainer(this.contentCont, GameViewId.NEW_DISCOVERY_POPUP_CONTENT);
    }

    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        this.discoveryTitleLabel.text = this.data.value;

        this.discoveryInfoLabel.text = "";
        if (this.data.infoId) {
            this.discoveryInfoLabel.text = getText(this.data.infoId);
        }

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.modalBg.width = this.resizeSize.x;
        this.modalBg.height = this.resizeSize.y;

        this.titleLabel.x = Math.floor((this.popupWidth - this.titleLabel.width) / 2);
        this.titleLabel.y = 60;

        this.discoveryTitleLabel.x = Math.floor((this.popupWidth - this.discoveryTitleLabel.width) / 2);
        this.discoveryTitleLabel.y = this.titleLabel.y + this.titleLabel.height - 20;

        this.discoveryInfoLabel.x = Math.floor((this.popupWidth - this.discoveryInfoLabel.width) / 2);
        this.discoveryInfoLabel.y = this.discoveryTitleLabel.y + this.discoveryTitleLabel.height;

        this.collectBtn.x = Math.floor((this.popupWidth - this.collectBtn.width) / 2);
        this.collectBtn.y = this.discoveryInfoLabel.y + this.discoveryInfoLabel.height + 60;

        this.bg.clear();
        this.bg.beginFill(TemplateSettings.colors.black);
        this.bg.lineStyle(8, TemplateSettings.colors.blue, 1, 0);
        this.bg.drawRoundedRect(
            0,
            0,
            this.popupWidth,
            this.collectBtn.y + this.collectBtn.height + 60,
            20
        );

        this.contentCont.x = this.modalBg.x + Math.floor((this.modalBg.width - this.contentCont.width) / 2);
        this.contentCont.y = this.modalBg.y + Math.floor((this.modalBg.height - this.contentCont.height) / 2);


        //
        const tempGlobalPos: Point = this.collectBtn.parent.toGlobal(
            new Point(
                this.collectBtn.x + (this.collectBtn.width / 2),
                this.collectBtn.y + (this.collectBtn.height / 2)
            )
        );
        appStorage().change<GamePageModuleState>()("gamePage.popups.newDiscovery.collectBtnGlobalPos", { x: tempGlobalPos.x, y: tempGlobalPos.y });
    }

}