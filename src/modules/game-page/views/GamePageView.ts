
import { appStorage, ColumnLayout, ContainersManager, DeepReadonly, MultiColumnLayout, RowLayout, SimpleButtonView, SimpleList } from '@flashist/appframework';
import { BasePageView } from "@flashist/appframework/pages/views/BasePageView";
import {
    Align,
    DisplayResizeTools,
    FContainer,
    FLabel,
    getInstance,
    getText,
    Graphics,
    Point
} from "@flashist/flibs";

import { TemplateSettings } from '../../../TemplateSettings';
import { IFormulaElementVO } from '../../game-logic/data/formula/IFormulaElementVO';
import { ISelectedFormulaElementVO } from '../../game-logic/data/formula/ISelectedFormulaElementVO';
import { NumberId } from '../../game-logic/data/formula/NumberId';
import { OperationId } from '../../game-logic/data/formula/OperationId';
import { GameLogicModuleState } from "../../game-logic/data/state/GameLogicModuleState";
import { IGameTaskVO } from '../../game-logic/data/tasks/IGameTaskVO';
import { ScaledEffectsContainerId } from '../data/ScaledEffectsContainerId';
import { GamePageModuleState } from '../data/state/GamePageModuleState';
import { FormualErrorView } from './formula/error/FormulaErrorView';
import { FinalFormulaElementView } from './formula/final/FinalFormulaElementView';
import { SelectFormulaElementView } from './formula/select/SelectFormulaElementView';
import { GamePageGlobalEvent } from './GamePageGlobalEvent';
import { GameViewId } from './GameViewId';
import { HelpPopupView } from './popups/help/HelpPopupView';
import { NewDiscoveryPopupView } from './popups/new-discovery/NewDiscoveryPopupView';
import { GamePageSingleTaskView } from './tasks/GamePageSingleTaskView';

export class GamePageView extends BasePageView {

    protected gameLogicState: DeepReadonly<GameLogicModuleState>;
    protected containersManager: ContainersManager;

    protected scaledEffectsCont: FContainer;

    protected topAreaPlaceholder: Graphics;
    protected formulaAreaPlaceholder: Graphics;
    protected bottomAreaPlaceholder: Graphics;
    protected numbersAreaPlaceholder: Graphics;
    protected operationsAreaPlaceholder: Graphics;

    // protected testFormulasCont: BaseLayoutableContainer;
    // protected testFormulasLayout: ColumnLayout;
    // //
    // protected formulaLabelControl: FLabel;
    // //
    // protected formulaLabel1: FLabel;
    // protected formulaLabel2: FLabel;
    // protected formulaLabel3: FLabel;

    protected formulaBg: Graphics;
    protected formulaTopSeparator: Graphics;
    protected formulaBottomSeparator: Graphics;

    protected formulaEmptyCont: FContainer;
    protected formulaExistCont: FContainer;

    // protected formulaInsideCont: FContainer;
    protected formulaTitleLabel: FLabel;
    //
    // protected formulaLabel: FLabel;
    public formulaElementsList: SimpleList<FinalFormulaElementView, ISelectedFormulaElementVO>;
    protected formualElementsLayout: RowLayout;
    //
    // protected formulaErrorLabel: FLabel;
    protected formulaErrorView: FormualErrorView;
    public formulaDiscoverBtn: SimpleButtonView;
    protected formulaEmptyMessageLabel: FLabel;
    //
    public formulaResetBtn: SimpleButtonView;
    public formulaBackspaceBtn: SimpleButtonView;
    protected formulaEditAreaCont: FContainer;
    protected formulaEditArea: Graphics;
    //
    protected formulaAndDiscoverAreaCont: FContainer;
    protected formulaAndDiscoverArea: Graphics;

    protected numbersTitleLabel: FLabel;
    protected numbersSelectorsList: SimpleList<SelectFormulaElementView, IFormulaElementVO>;
    protected numbersSelectorsLayout: MultiColumnLayout;
    protected numbersBottomSeparator: Graphics;

    protected operationsTitleLabel: FLabel;
    protected operationsSelectorsList: SimpleList<SelectFormulaElementView, IFormulaElementVO>;
    protected operationsSelectorsLayout: MultiColumnLayout;
    protected operationsBottomSeparator: Graphics;

    protected tasksCont: FContainer;
    protected tasksTitleLabel: FLabel;
    protected tasksList: SimpleList<GamePageSingleTaskView, IGameTaskVO>;
    protected tasksLayout: ColumnLayout;

    protected settingsBtn: SimpleButtonView;

    // Popups
    protected popupsCont: FContainer;
    protected newDiscoveryPopup: NewDiscoveryPopupView;
    protected helpPopup: HelpPopupView;

    protected construction(...args: any[]): void {
        super.construction(...args);

        // TEST
        // this.sizeAreaView.visible = true;

        this.gameLogicState = appStorage().getState<GameLogicModuleState>();
        this.containersManager = getInstance(ContainersManager);

        // Placeholders
        this.topAreaPlaceholder = new Graphics();
        // this.contentCont.addChild(this.topAreaPlaceholder);
        this.topAreaPlaceholder.alpha = 0.5;
        //
        this.topAreaPlaceholder.beginFill(0xFF0000);
        this.topAreaPlaceholder.drawRect(0, 0, 10, 10);

        this.formulaAreaPlaceholder = new Graphics();
        // this.contentCont.addChild(this.formulaAreaPlaceholder);
        this.formulaAreaPlaceholder.alpha = 0.5;
        //
        this.formulaAreaPlaceholder.beginFill(0x00FF00);
        this.formulaAreaPlaceholder.drawRect(0, 0, 10, 10);

        this.bottomAreaPlaceholder = new Graphics();
        // this.contentCont.addChild(this.bottomAreaPlaceholder);
        this.bottomAreaPlaceholder.alpha = 0.5;
        //
        this.bottomAreaPlaceholder.beginFill(0x0000FF);
        this.bottomAreaPlaceholder.drawRect(0, 0, 10, 10);

        this.numbersAreaPlaceholder = new Graphics();
        // this.contentCont.addChild(this.bottomAreaPlaceholder);
        this.numbersAreaPlaceholder.alpha = 0.5;
        //
        this.numbersAreaPlaceholder.beginFill(0x0000FF);
        this.numbersAreaPlaceholder.drawRect(0, 0, 10, 10);

        this.operationsAreaPlaceholder = new Graphics();
        // this.contentCont.addChild(this.bottomAreaPlaceholder);
        this.operationsAreaPlaceholder.alpha = 0.5;
        //
        this.operationsAreaPlaceholder.beginFill(0x0000FF);
        this.operationsAreaPlaceholder.drawRect(0, 0, 10, 10);


        this.formulaBg = new Graphics();
        this.contentCont.addChild(this.formulaBg);
        //
        this.formulaBg.alpha = 0.25;
        this.formulaBg.beginFill(TemplateSettings.colors.beige);
        this.formulaBg.drawRect(0, 0, 10, 10);

        this.formulaTopSeparator = new Graphics();
        this.contentCont.addChild(this.formulaTopSeparator);
        //
        this.formulaTopSeparator.beginFill(TemplateSettings.colors.beige);
        this.formulaTopSeparator.drawRect(0, 0, 10, 4);

        this.formulaBottomSeparator = new Graphics();
        this.contentCont.addChild(this.formulaBottomSeparator);
        //
        this.formulaBottomSeparator.beginFill(TemplateSettings.colors.beige);
        this.formulaBottomSeparator.drawRect(0, 0, 10, 4);


        // this.formulaInsideCont = new FContainer();
        // this.contentCont.addChild(this.formulaInsideCont);

        this.formulaEmptyCont = new FContainer();
        this.contentCont.addChild(this.formulaEmptyCont);

        this.formulaExistCont = new FContainer();
        this.contentCont.addChild(this.formulaExistCont);

        this.formulaTitleLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 96,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.contentCont.addChild(this.formulaTitleLabel);
        //
        this.formulaTitleLabel.alpha = 0.5;
        //
        this.formulaTitleLabel.text = getText("gamePage.formulaTitle");

        // this.formulaLabel = new FLabel({
        //     fontFamily: TemplateSettings.fonts.complexFontFamily,
        //     size: 192,
        //     color: TemplateSettings.colors.beige,
        //     autosize: true
        // });
        // // this.formulaInsideCont.addChild(this.formulaLabel);
        // // TEST
        // this.formulaLabel.text = "1+2=?";

        this.formulaAndDiscoverAreaCont = new FContainer();
        this.formulaExistCont.addChild(this.formulaAndDiscoverAreaCont);
        //
        this.formulaAndDiscoverAreaCont.visible = false;
        //
        this.formulaAndDiscoverArea = new Graphics();
        this.formulaAndDiscoverAreaCont.addChild(this.formulaAndDiscoverArea);
        //
        this.formulaAndDiscoverArea.beginFill(0xFF0000);
        this.formulaAndDiscoverArea.drawRect(0, 0, 10, 10);


        this.formulaElementsList = new SimpleList<FinalFormulaElementView, ISelectedFormulaElementVO>();
        this.formulaExistCont.addChild(this.formulaElementsList);
        //
        this.formulaElementsList.ItemRendererClass = FinalFormulaElementView;

        this.formualElementsLayout = new RowLayout();

        this.formulaEmptyMessageLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 96,
            color: TemplateSettings.colors.beige,
            align: Align.CENTER,
            autosize: true
            // lineHeight: 80
        });
        this.formulaEmptyCont.addChild(this.formulaEmptyMessageLabel);
        //
        // this.formulaEmptyMessageLabel.text = "-To start select a number\nor an operation-";
        this.formulaEmptyMessageLabel.text = getText("gamePage.formulaEmptyMessage");

        // this.formulaErrorLabel = new FLabel({
        //     fontFamily: TemplateSettings.fonts.complexFontFamily,
        //     size: 48,
        //     color: TemplateSettings.colors.reddish,
        //     autosize: true
        // });
        // this.formulaExistCont.addChild(this.formulaErrorLabel);
        // // TEST
        // this.formulaErrorLabel.text = getText("errors.incorrectFormula");
        this.formulaErrorView = getInstance(FormualErrorView);
        this.formulaExistCont.addChild(this.formulaErrorView);

        this.formulaDiscoverBtn = new SimpleButtonView({
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
                contentToBgPaddingX: 40,
                contentToBgPaddingY: 20
            }
        });
        this.formulaExistCont.addChild(this.formulaDiscoverBtn);
        //
        this.formulaDiscoverBtn.text = getText("gamePage.formulaDiscoverBtn");

        // const computeBtnView: FContainer = new FContainer();
        // //
        // const computeBtnLabel: FLabel = new FLabel({
        //     fontFamily: TemplateSettings.fonts.mainFont,
        //     size: 64,
        //     color: TemplateSettings.colors.beige,
        //     autosize: true
        // });
        // computeBtnView.addChild(computeBtnLabel);
        // //
        // computeBtnLabel.text = getText("gamePage.formulaCompute");
        // //
        // const solveBtnBg: Graphics = new Graphics();
        // computeBtnView.addChildAt(solveBtnBg, 0);
        // //
        // solveBtnBg.beginFill(TemplateSettings.colors.blue);
        // solveBtnBg.lineStyle(4, TemplateSettings.colors.beige, 1, 0);
        // solveBtnBg.drawRoundedRect(
        //     0,
        //     0,
        //     Math.floor(computeBtnLabel.width + 80),
        //     Math.floor(computeBtnLabel.height + 40),
        //     10
        // );
        // //
        // computeBtnLabel.x = solveBtnBg.x + Math.floor((solveBtnBg.width - computeBtnLabel.width) / 2);
        // computeBtnLabel.y = solveBtnBg.y + Math.floor((solveBtnBg.height - computeBtnLabel.height) / 2);
        // //
        // this.formulaComputeBtn = new SimpleButtonView({});
        // this.formulaExistCont.addChild(this.formulaComputeBtn);
        // //
        // this.formulaComputeBtn.addExternalView(computeBtnView);


        this.formulaResetBtn = new SimpleButtonView({
            labelConfig: {
                fontFamily: TemplateSettings.fonts.mainFont,
                size: 48,
                color: TemplateSettings.colors.beige,
                autosize: true
            },
            states: {
                normal: {
                    alpha: 0.5
                }
            },
            bgConfig: {
                contentToBgPaddingX: 10,
                contentToBgPaddingY: 10
            }
        });
        this.formulaExistCont.addChild(this.formulaResetBtn);
        //
        this.formulaResetBtn.text = getText("gamePage.formulaReset");

        this.formulaBackspaceBtn = new SimpleButtonView({
            states: {
                normal: {
                    icon: "BackspaceIcon",
                    alpha: 0.5
                }
            }
        });
        this.formulaExistCont.addChild(this.formulaBackspaceBtn);
        //
        // this.formulaBackspaceBtn.text = "⌫";


        this.formulaEditAreaCont = new FContainer();
        this.formulaExistCont.addChild(this.formulaEditAreaCont);
        //
        this.formulaEditAreaCont.visible = false;
        //
        this.formulaEditArea = new Graphics();
        this.formulaEditAreaCont.addChild(this.formulaEditArea);
        //
        this.formulaEditArea.beginFill(0xFF0000);
        this.formulaEditArea.drawRect(0, 0, 10, 10);


        // Numbers

        this.numbersTitleLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 96,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.contentCont.addChild(this.numbersTitleLabel);
        //
        this.numbersTitleLabel.alpha = 0.75;
        //
        this.numbersTitleLabel.text = getText("gamePage.numbersTitle");

        this.numbersSelectorsList = new SimpleList<SelectFormulaElementView, IFormulaElementVO>();
        this.contentCont.addChild(this.numbersSelectorsList);
        //
        this.numbersSelectorsList.ItemRendererClass = SelectFormulaElementView;
        //
        // this.numbersSelectorsList.useItemsCache = true;
        // this.numbersSelectorsList.reuseItemsForConcreteData = true;

        this.numbersSelectorsLayout = new MultiColumnLayout({ columnsCount: 5, spacingX: 80, spacingY: 40 });

        this.numbersBottomSeparator = new Graphics();
        this.contentCont.addChild(this.numbersBottomSeparator);
        //
        this.numbersBottomSeparator.beginFill(TemplateSettings.colors.beige);
        this.numbersBottomSeparator.drawRect(0, 0, 10, 2);
        ;
        this.numbersBottomSeparator.alpha = 0.75;


        // Operations

        this.operationsTitleLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 96,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.contentCont.addChild(this.operationsTitleLabel);
        //
        this.operationsTitleLabel.alpha = 0.75;
        //
        this.operationsTitleLabel.text = getText("gamePage.operationsTitle");

        this.operationsSelectorsList = new SimpleList<SelectFormulaElementView, IFormulaElementVO>();
        this.contentCont.addChild(this.operationsSelectorsList);
        //
        this.operationsSelectorsList.ItemRendererClass = SelectFormulaElementView;
        //
        this.operationsSelectorsLayout = new MultiColumnLayout({ columnsCount: 5, spacingX: 80, spacingY: 40 });


        // Tasks
        this.tasksCont = new FContainer();
        this.contentCont.addChild(this.tasksCont);

        this.tasksTitleLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 96,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.tasksCont.addChild(this.tasksTitleLabel);
        //
        // this.tasksTitleLabel.alpha = 0.5;
        //
        this.tasksTitleLabel.text = getText("gamePage.tasksTitle");

        this.tasksList = new SimpleList<GamePageSingleTaskView, IGameTaskVO>();
        this.tasksCont.addChild(this.tasksList);
        //
        this.tasksList.ItemRendererClass = GamePageSingleTaskView;

        this.tasksLayout = new ColumnLayout();


        //
        this.settingsBtn = new SimpleButtonView({
            states: {
                normal: {
                    icon: "PauseIcon",
                    alpha: 0.5
                }
            }
        });
        this.contentCont.addChild(this.settingsBtn);
        //
        this.settingsBtn.text = "⚙";


        // TEST
        // this.tasksList.dataProvider = [{
        //     id: "",
        //     type: GameTaskType.DISCOVER,
        //     formulaElementId: NumberId.EIGHT
        // },
        // {
        //     id: "",
        //     type: GameTaskType.DISCOVER,
        //     formulaElementId: NumberId.NINE
        // },
        // {
        //     id: "",
        //     type: GameTaskType.DISCOVER,
        //     formulaElementId: OperationId.DIVISION
        // }];

        // protected tasksList: SimpleList<GamePageSingleTaskView, IGameTaskVO>;
        // protected tasksLayout: ColumnLayout;


        // Popups
        this.popupsCont = new FContainer();
        this.contentCont.addChild(this.popupsCont);
        //
        this.newDiscoveryPopup = getInstance(NewDiscoveryPopupView);
        this.popupsCont.addChild(this.newDiscoveryPopup);
        //
        this.helpPopup = getInstance(HelpPopupView);
        this.popupsCont.addChild(this.helpPopup);


        // Effects
        //
        this.scaledEffectsCont = new FContainer();
        this.contentCont.addChild(this.scaledEffectsCont);
        this.containersManager.addContainer(this.scaledEffectsCont, ScaledEffectsContainerId);
        //
        this.containersManager.addContainer(this.formulaDiscoverBtn, GameViewId.DISCOVER_BUTTON);
        this.containersManager.addContainer(this.formulaAndDiscoverAreaCont, GameViewId.FORMULA_AND_DISCOVER_AREA);
        this.containersManager.addContainer(this.formulaErrorView, GameViewId.FORMULA_ERROR);
        this.containersManager.addContainer(this.tasksCont, GameViewId.TASKS);
        this.containersManager.addContainer(this.formulaEditAreaCont, GameViewId.EDIT_AREA);

        // TEST
        // const testView = new GamePageSingleTaskView();
        // this.contentCont.addChild(testView);
        // //
        // testView.data = {
        //     id: "",
        //     type: GameTaskType.DISCOVER,
        //     formulaElementId: NumberId.EIGHT
        // } as IGameTaskVO;
    }

    protected onAddedToStage(): void {
        super.onAddedToStage();

        this.globalDispatcher.dispatchEvent(GamePageGlobalEvent.FIRST_INIT_COMPLETE);
    }

    protected arrange(): void {
        super.arrange();

        this.sizeAreaView.x = Math.floor((this.contentContReversedResizeSize.width - this.sizeArea.width) / 2);
        this.sizeAreaView.y = Math.floor((this.contentContReversedResizeSize.height - this.sizeArea.height) / 2);

        const topAreaHeightCoef: number = 3 / 16;
        this.topAreaPlaceholder.width = Math.ceil(this.contentContReversedResizeSize.width);
        this.topAreaPlaceholder.height = Math.ceil(this.sizeAreaView.height * topAreaHeightCoef);
        this.topAreaPlaceholder.x = -1 * this.contentContLocalPosOfGlobalZero.x;
        this.topAreaPlaceholder.y = -1 * this.contentContLocalPosOfGlobalZero.y;

        const formulaAreaHeightCoef: number = 4 / 16;
        this.formulaAreaPlaceholder.width = this.topAreaPlaceholder.width;
        this.formulaAreaPlaceholder.height = Math.ceil(this.sizeAreaView.height * formulaAreaHeightCoef);
        this.formulaAreaPlaceholder.x = this.topAreaPlaceholder.x;
        this.formulaAreaPlaceholder.y = this.topAreaPlaceholder.y + this.topAreaPlaceholder.height;

        const bottomAreaHeightCoef: number = 9 / 16;
        this.bottomAreaPlaceholder.width = this.formulaAreaPlaceholder.width;
        this.bottomAreaPlaceholder.height = Math.ceil(this.sizeAreaView.height * bottomAreaHeightCoef);
        this.bottomAreaPlaceholder.x = this.formulaAreaPlaceholder.x;
        this.bottomAreaPlaceholder.y = this.formulaAreaPlaceholder.y + this.formulaAreaPlaceholder.height;

        this.numbersAreaPlaceholder.width = this.bottomAreaPlaceholder.width;
        this.numbersAreaPlaceholder.height = this.bottomAreaPlaceholder.height / 2;
        this.numbersAreaPlaceholder.x = this.bottomAreaPlaceholder.x;
        this.numbersAreaPlaceholder.y = this.bottomAreaPlaceholder.y;

        this.operationsAreaPlaceholder.width = this.bottomAreaPlaceholder.width;
        this.operationsAreaPlaceholder.height = this.bottomAreaPlaceholder.height / 2;
        this.operationsAreaPlaceholder.x = this.bottomAreaPlaceholder.x;
        this.operationsAreaPlaceholder.y = this.bottomAreaPlaceholder.y + this.numbersAreaPlaceholder.height;


        // Fomula Block
        this.formulaBg.width = this.formulaAreaPlaceholder.width;
        this.formulaBg.height = this.formulaAreaPlaceholder.height;
        this.formulaBg.x = this.formulaAreaPlaceholder.x;
        this.formulaBg.y = this.formulaAreaPlaceholder.y;
        //
        this.formulaTopSeparator.width = this.formulaAreaPlaceholder.width;
        this.formulaTopSeparator.x = this.formulaAreaPlaceholder.x;
        this.formulaTopSeparator.y = this.formulaAreaPlaceholder.y;
        //
        this.formulaBottomSeparator.width = this.formulaAreaPlaceholder.width;
        this.formulaBottomSeparator.x = this.formulaAreaPlaceholder.x;
        this.formulaBottomSeparator.y = this.formulaAreaPlaceholder.y + this.formulaAreaPlaceholder.height;
        //
        this.formualElementsLayout.arrange(this.formulaElementsList);
        //
        // this.formulaContLayout.arrange(this.formulaCont);
        // const formulaContMaxWidth: number = Math.max(this.formulaTitleLabel.width, this.formulaLabel.width, this.formulaErrorLabel.width, this.formulaEmptyMessageLabel.width);
        // const formulaContMaxWidth: number = Math.max(this.formulaElementsList.width, this.formulaTitleLabel.width, this.formulaErrorLabel.width, this.formulaEmptyMessageLabel.width);
        //
        this.formulaTitleLabel.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaTitleLabel.width) / 2);
        this.formulaTitleLabel.y = this.formulaAreaPlaceholder.y + 40;
        //
        // this.formulaLabel.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaLabel.width) / 2);
        // this.formulaLabel.y = this.formulaTitleLabel.y + this.formulaTitleLabel.height - 20;
        //
        this.formulaElementsList.scale.set(1);
        this.formulaElementsList.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaElementsList.width) / 2);
        this.formulaElementsList.y = this.formulaTitleLabel.y + this.formulaTitleLabel.height - 20;
        //
        // this.formulaBackspaceBtn.x = this.formulaElementsList.x + this.formulaElementsList.width + 80;
        this.formulaBackspaceBtn.x = Math.floor(this.formulaAreaPlaceholder.x + this.formulaAreaPlaceholder.width - this.formulaBackspaceBtn.width) - 40;
        this.formulaBackspaceBtn.y = this.formulaElementsList.y + Math.floor((this.formulaElementsList.height - this.formulaBackspaceBtn.height) / 2) - 5;
        //
        // Make sure the formula elements don't go too far
        if (this.formulaElementsList.x + this.formulaElementsList.width > this.formulaBackspaceBtn.x) {
            //
            const tempCenterY: number = this.formulaElementsList.y + (this.formulaElementsList.height / 2);
            //
            const tempScale: number = DisplayResizeTools.getScale(
                this.formulaElementsList.width,
                this.formulaElementsList.height,
                this.formulaBackspaceBtn.x,
                this.formulaElementsList.height
            );
            this.formulaElementsList.scale.set(tempScale);
            //
            this.formulaElementsList.x = Math.floor(this.formulaBackspaceBtn.x - this.formulaElementsList.width);
            this.formulaElementsList.y = Math.floor(tempCenterY - (this.formulaElementsList.height / 2));
        }
        //
        this.formulaEmptyMessageLabel.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaEmptyMessageLabel.width) / 2);
        this.formulaEmptyMessageLabel.y = this.formulaTitleLabel.y + this.formulaTitleLabel.height;
        //
        // this.formulaErrorLabel.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaErrorLabel.width) / 2);
        // // this.formulaErrorLabel.y = this.formulaLabel.y + this.formulaLabel.height - 20;
        // this.formulaErrorLabel.y = this.formulaTitleLabel.y + this.formulaTitleLabel.height + 180;
        this.formulaErrorView.resize(this.formulaAreaPlaceholder.width, 80);
        this.formulaErrorView.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaErrorView.width) / 2);
        this.formulaErrorView.y = this.formulaTitleLabel.y + this.formulaTitleLabel.height + 200;
        //
        // this.formulaInsideCont.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaInsideCont.width) / 2);
        // this.formulaInsideCont.y = this.formulaAreaPlaceholder.y + 80;

        this.formulaDiscoverBtn.x = this.formulaAreaPlaceholder.x + Math.floor((this.formulaAreaPlaceholder.width - this.formulaDiscoverBtn.width) / 2);
        this.formulaDiscoverBtn.y = this.formulaAreaPlaceholder.y + this.formulaAreaPlaceholder.height - this.formulaDiscoverBtn.height - 40;

        this.formulaResetBtn.x = Math.floor(this.formulaAreaPlaceholder.x + this.formulaAreaPlaceholder.width - this.formulaResetBtn.width) - 40;
        this.formulaResetBtn.y = Math.floor(this.formulaAreaPlaceholder.y + this.formulaAreaPlaceholder.height - this.formulaResetBtn.height) - 40;

        this.formulaAndDiscoverArea.x = this.formulaElementsList.x;
        this.formulaAndDiscoverArea.y = this.formulaElementsList.y;
        this.formulaAndDiscoverArea.width = this.formulaElementsList.width;
        this.formulaAndDiscoverArea.height = (this.formulaDiscoverBtn.y + this.formulaDiscoverBtn.height) - this.formulaElementsList.y;

        const editAreaMinX: number = Math.min(this.formulaBackspaceBtn.x, this.formulaResetBtn.x);
        const editAreaWidth: number = (this.formulaBackspaceBtn.x + this.formulaBackspaceBtn.width) - editAreaMinX;
        this.formulaEditArea.x = editAreaMinX;
        this.formulaEditArea.y = this.formulaBackspaceBtn.y;
        this.formulaEditArea.width = editAreaWidth;
        this.formulaEditArea.height = (this.formulaResetBtn.y + this.formulaResetBtn.height) - this.formulaBackspaceBtn.y;


        this.numbersTitleLabel.x = this.numbersAreaPlaceholder.x + Math.floor((this.numbersAreaPlaceholder.width - this.numbersTitleLabel.width) / 2);
        this.numbersTitleLabel.y = this.numbersAreaPlaceholder.y + 80;

        this.numbersSelectorsLayout.arrange(this.numbersSelectorsList);
        //
        this.numbersSelectorsList.x = this.numbersAreaPlaceholder.x + Math.floor((this.numbersAreaPlaceholder.width - this.numbersSelectorsList.width) / 2);
        this.numbersSelectorsList.y = this.numbersTitleLabel.y + this.numbersTitleLabel.height + 20;

        this.numbersBottomSeparator.width = this.numbersAreaPlaceholder.width;
        this.numbersBottomSeparator.x = this.numbersAreaPlaceholder.x;
        this.numbersBottomSeparator.y = this.numbersAreaPlaceholder.y + this.numbersAreaPlaceholder.height;


        this.operationsTitleLabel.x = this.operationsAreaPlaceholder.x + Math.floor((this.operationsAreaPlaceholder.width - this.operationsTitleLabel.width) / 2);
        this.operationsTitleLabel.y = this.operationsAreaPlaceholder.y + 80;

        this.operationsSelectorsLayout.arrange(this.operationsSelectorsList);
        //
        this.operationsSelectorsList.x = this.operationsAreaPlaceholder.x + Math.floor((this.operationsAreaPlaceholder.width - this.operationsSelectorsList.width) / 2);
        this.operationsSelectorsList.y = this.operationsTitleLabel.y + this.operationsTitleLabel.height + 20;


        // Tasks
        this.tasksCont.x = this.topAreaPlaceholder.x + 40;
        this.tasksCont.y = this.topAreaPlaceholder.y + 80;
        //
        this.tasksLayout.arrange(this.tasksList);
        //
        this.tasksList.y = this.tasksTitleLabel.y + this.tasksTitleLabel.height;


        this.settingsBtn.x = Math.floor(this.topAreaPlaceholder.x + this.topAreaPlaceholder.width - this.settingsBtn.width) - 40;
        this.settingsBtn.y = this.topAreaPlaceholder.y + 80;


        // Popups
        this.popupsCont.x = this.contentContLocalPosOfGlobalZero.x;
        this.popupsCont.y = this.contentContLocalPosOfGlobalZero.y;
        //
        this.newDiscoveryPopup.resize(this.contentContReversedResizeSize.width, this.contentContReversedResizeSize.height);
        //
        this.helpPopup.resize(this.contentContReversedResizeSize.width, this.contentContReversedResizeSize.height);


        //
        const tempNumbersGlobalPos: Point = this.numbersSelectorsList.parent.toGlobal(
            new Point(
                this.numbersSelectorsList.x + (this.numbersSelectorsList.width / 2),
                this.numbersSelectorsList.y + (this.numbersSelectorsList.height / 2)
            )
        );
        appStorage().change<GamePageModuleState>()("gamePage.numbersListGlobalPos", { x: tempNumbersGlobalPos.x, y: tempNumbersGlobalPos.y });
        //
        const tempOperationsGlobalPos: Point = this.operationsSelectorsList.parent.toGlobal(
            new Point(
                this.operationsSelectorsList.x + (this.operationsSelectorsList.width / 2),
                this.operationsSelectorsList.y + (this.operationsSelectorsList.height / 2)
            )
        );
        appStorage().change<GamePageModuleState>()("gamePage.operationsListGlobalPos", { x: tempOperationsGlobalPos.x, y: tempOperationsGlobalPos.y });
    }

    public setAvailableNumbers(numbersData: IFormulaElementVO[]): void {
        this.numbersSelectorsList.dataProvider = numbersData;

        //
        const allItems: SelectFormulaElementView[] = this.numbersSelectorsList.getItems()
        for (let singleItem of allItems) {
            let tempContId: string = "";

            switch (singleItem.data.id) {
                case NumberId.ONE:
                    tempContId = GameViewId.SELECT_ELEMENT_1;
                    break;
                case NumberId.TWO:
                    tempContId = GameViewId.SELECT_ELEMENT_2;
                    break;
            }

            if (tempContId) {
                this.containersManager.addContainer(singleItem, tempContId);
            }
        }

        this.arrange();
    }

    public setAvailableOperations(operationsData: IFormulaElementVO[]): void {
        this.operationsSelectorsList.dataProvider = operationsData;

        //
        const allItems: SelectFormulaElementView[] = this.operationsSelectorsList.getItems();
        for (let singleItem of allItems) {
            let tempContId: string = "";

            switch (singleItem.data.id) {
                case OperationId.EQUAL:
                    tempContId = GameViewId.SELECT_ELEMENT_EQUAL;
                    break;
                case OperationId.QUESTION:
                    tempContId = GameViewId.SELECT_ELEMENT_QUESTION;
                    break;
                case OperationId.ADDITION:
                    tempContId = GameViewId.SELECT_ELEMENT_ADDITION;
                    break;
            }

            if (tempContId) {
                this.containersManager.addContainer(singleItem, tempContId);
            }
        }

        this.arrange();
    }

    public setSelectedElements(selectedElementsData: ISelectedFormulaElementVO[]): void {
        this.formulaElementsList.dataProvider = selectedElementsData;

        if (selectedElementsData.length > 0) {
            // this.formulaElementsList.visible = true;
            // this.formulaBackspaceBtn.visible = true;
            // this.formulaResetBtn.visible = true;

            // this.formulaLabel.visible = true;
            // this.formulaErrorLabel.visible = true;

            // this.formulaEmptyMessageLabel.visible = false;

            this.formulaExistCont.visible = true;
            this.formulaEmptyCont.visible = false;

        } else {
            // this.formulaElementsList.visible = false;
            // this.formulaBackspaceBtn.visible = false;
            // this.formulaResetBtn.visible = false;

            // this.formulaLabel.visible = false;
            // this.formulaErrorLabel.visible = false;

            // this.formulaEmptyMessageLabel.visible = true;

            this.formulaExistCont.visible = false;
            this.formulaEmptyCont.visible = true;
        }

        this.arrange();
    }

    public setActiveTasks(tasks: IGameTaskVO[]): void {
        this.tasksList.dataProvider = tasks;

        this.arrange();
    }
}