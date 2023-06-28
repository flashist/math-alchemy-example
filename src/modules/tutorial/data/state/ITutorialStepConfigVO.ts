import { Align, VAlign } from "@flashist/flibs";

export interface ITutorialStepConfigVO {
    id: string;
    // The id of a step, which will be "saved" as complete,
    // it might be different from the id parameter
    // in the cases of complex-multilevel tutorial steps,
    // when you need to "save" the very first tutorial step as complete
    // only when all other steps are done
    completeSaveStepId?: string;

    textId?: string;
    viewId?: string;

    targetViewHolePadding?: number;
    requiredCompleteStepIds?: string[];
    blocking?: boolean;

    align?: Align;
    valign?: VAlign;

    labelAlign?: Align;
    labelValign?: VAlign;

    minTimeToDisplayMs?: number;

    completeOnStageDown?: boolean;
}