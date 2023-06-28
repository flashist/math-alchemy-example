import { BaseAppMediator } from "@flashist/appframework";
import { InteractiveEvent } from "@flashist/flibs";
import { FinalFormulaElementView } from "./FinalFormulaElementView";
import { RemoveFormulaElementByIndexCommand } from "../../../../game-logic/commands/formula/RemoveFormulaElementByIndexCommand";

export class FinalFormulaElementMediator extends BaseAppMediator<FinalFormulaElementView> {

    onActivatorStart(activator: FinalFormulaElementView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator,
            InteractiveEvent.DOWN,
            this.onSelect
        );
    }

    protected onSelect(): void {
        new RemoveFormulaElementByIndexCommand(this.activator.data.index)
            .execute();
    }

}