import { BaseAppMediator, SimpleButtonView } from "@flashist/appframework";
import { InteractiveEvent } from "@flashist/flibs";
import { SelectFormulaElementView } from "./SelectFormulaElementView";
import { AddFormulaElementCommand } from "../../../../game-logic/commands/formula/AddFormulaElementCommand";
import { NumberId } from "../../../../game-logic/data/formula/NumberId";
import { SelectFormulaElementGlobalEvent } from "./SelectFormulaElementGlobalEvent";

export class SelectFormulaElementMediator extends BaseAppMediator<SelectFormulaElementView> {

    onActivatorStart(activator: SelectFormulaElementView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator,
            InteractiveEvent.DOWN,
            this.onSelect
        );
    }

    protected onSelect(): void {
        this.globalDispatcher.dispatchEvent(SelectFormulaElementGlobalEvent.ELEMENT_SELECTED, this.activator.data);

        new AddFormulaElementCommand(this.activator.data.id)
            .execute();
    }

}