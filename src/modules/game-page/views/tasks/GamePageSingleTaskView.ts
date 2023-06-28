import { BaseAppView, DeepReadonly, appStorage } from "@flashist/appframework";
import { FLabel, getInstance, getText } from "@flashist/flibs";
import { IGameTaskVO } from "../../../game-logic/data/tasks/IGameTaskVO";
import { TemplateSettings } from "../../../../TemplateSettings";
import { GameLogicTools } from "../../../game-logic/tools/GameLogicTools";
import { GameLogicModuleState } from "../../../game-logic/data/state/GameLogicModuleState";
import { IFormulaElementVO } from "../../../game-logic/data/formula/IFormulaElementVO";
import { FormulaElementType } from "../../../game-logic/data/formula/FormulaElementType";

export class GamePageSingleTaskView extends BaseAppView<IGameTaskVO> {
    protected gameLogicTools: GameLogicTools;
    protected gameLogicState: DeepReadonly<GameLogicModuleState>;

    protected infoLabel: FLabel;

    protected construction(...args: any[]): void {
        super.construction(...args);

        this.gameLogicTools = getInstance(GameLogicTools);
        this.gameLogicState = appStorage().getState<GameLogicModuleState>();

        // this.alpha = 0.5;

        this.infoLabel = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 64,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.addChild(this.infoLabel);
    }

    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        const tempElementData: IFormulaElementVO = this.gameLogicTools.getFormulaElementById(this.data.formulaElementId);

        let textPatternId: string = "tasks.discoverNumber";
        if (tempElementData.type === FormulaElementType.OPERATION) {
            textPatternId = "tasks.discoverOperation";
        }

        const tempText: string = getText(
            textPatternId,
            {
                element: getText(tempElementData.titleId)
            }
        );
        this.infoLabel.text = tempText;

        this.arrange();
    }
}