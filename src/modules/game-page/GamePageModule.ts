import { BaseAppModule } from "@flashist/appframework/base/modules/BaseAppModule";
import { PagesModuleState } from "@flashist/appframework/pages/data/state/PagesModuleState";
import { appStorage } from "@flashist/appframework/state/AppStateModule";
import { serviceLocatorAdd } from "@flashist/flibs";
import { GamePageId } from "./data/GamePageId";
import { GamePageModuleInitialState } from "./data/state/GamePageModuleState";
import { GamePageMediator } from "./views/GamePageMediator";
import { GamePageView } from "./views/GamePageView";
import { SelectFormulaElementMediator } from "./views/formula/select/SelectFormulaElementMediator";
import { FinalFormulaElementMediator } from "./views/formula/final/FinalFormulaElementMediator";
import { NewDiscoveryPopupView } from "./views/popups/new-discovery/NewDiscoveryPopupView";
import { NewDiscoveryPopupMediator } from "./views/popups/new-discovery/NewDiscoveryPopupMediator";
import { HelpPopupView } from "./views/popups/help/HelpPopupView";
import { HelpPopupMediator } from "./views/popups/help/HelpPopupMediator";
import { SelectFormulaElementView } from "./views/formula/select/SelectFormulaElementView";
import { FinalFormulaElementView } from "./views/formula/final/FinalFormulaElementView";
import { FormualErrorView } from "./views/formula/error/FormulaErrorView";
import { FormulaErrorMediator } from "./views/formula/error/FormulaErrorMediator";

export class GamePageModule extends BaseAppModule {

    init(): void {
        super.init();

        appStorage().initializeWith(GamePageModuleInitialState);

        serviceLocatorAdd(GamePageView, { activateeConstructors: [GamePageMediator] });
        //
        serviceLocatorAdd(NewDiscoveryPopupView, { activateeConstructors: [NewDiscoveryPopupMediator] });
        serviceLocatorAdd(HelpPopupView, { activateeConstructors: [HelpPopupMediator] });
        //
        serviceLocatorAdd(SelectFormulaElementView, { activateeConstructors: [SelectFormulaElementMediator] });
        serviceLocatorAdd(FinalFormulaElementView, { activateeConstructors: [FinalFormulaElementMediator] });
        serviceLocatorAdd(FormualErrorView, { activateeConstructors: [FormulaErrorMediator] });
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        // let pagesModel: PagesModel = getInstance(PagesModel);
        // pagesModel.addPageViewClass(GamePageView, GamePageId);
        appStorage().change<PagesModuleState>()(
            `pages.pageIdToViewClassMap.${GamePageId}`,
            GamePageView
        );
    }
}