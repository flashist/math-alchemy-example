import { FLabel, getInstance } from "@flashist/flibs";
import { BaseAppView } from "@flashist/appframework";
import { ISelectedFormulaElementVO } from "../../../../game-logic/data/formula/ISelectedFormulaElementVO";
import { GameLogicTools } from "../../../../game-logic/tools/GameLogicTools";
import { TemplateSettings } from "../../../../../TemplateSettings";
import { IFormulaElementVO } from "../../../../game-logic/data/formula/IFormulaElementVO";

export class FinalFormulaElementView extends BaseAppView<ISelectedFormulaElementVO> {
    protected gameTools: GameLogicTools;

    protected label: FLabel;

    protected construction(...args: any[]): void {
        super.construction(...args);

        // this.interactive = true;
        // this.cursor = "pointer";

        this.gameTools = getInstance(GameLogicTools);

        this.label = new FLabel({
            fontFamily: TemplateSettings.fonts.complexFontFamily,
            size: 192,
            color: TemplateSettings.colors.beige,
            autosize: true
        });
        this.addChild(this.label);
    }

    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        const elementData: IFormulaElementVO = this.gameTools.findFormulaElements({ ids: [this.data.formulaElementId] })[0];
        this.label.text = elementData.value;
    }
}