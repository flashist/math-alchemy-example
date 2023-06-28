import { getInstance } from "@flashist/flibs";
import { BaseAppModule } from "@flashist/appframework/base/modules/BaseAppModule";
import { TestGameLogicCommand } from "./commands/TestGameLogicCommand";

export class GameTestModule extends BaseAppModule {

    initCompleteHook(): void {
        super.initCompleteHook();

        getInstance(TestGameLogicCommand)
            .execute();
    }
}