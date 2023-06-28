import { ECSRenderModule } from "@flashist/appframework/ecs-rendermodule/ECSRenderModule";
import { ECSModule } from "@flashist/appframework/ecs/ECSModule";
import { Facade } from "@flashist/appframework/facade/Facade";
import { TemplateAppModule } from "./modules/app/TemplateAppModule";
import { GameLogicModule } from "./modules/game-logic/GameLogicModule";

import { GamePageModule } from "./modules/game-page/GamePageModule";
import { PreloaderPageModule } from "./modules/preloader-page/PreloaderPageModule";
import { TutorialModule } from "./modules/tutorial/TutorialModule";
import { GameTutorialModule } from "./modules/game-tutorial/GameTutorialModule";
import { GameSaveModule } from "./modules/game-save/GameSaveModule";
import { GameRendererModule } from "./modules/game-renderer/GameRendererModule";
import { GameTestModule } from "./modules/game-test/GameTestModule";

export class TemplateFacade extends Facade {

    protected addModules(): void {
        super.addModules();

        console.log("TemplateFacade | addModules");

        // Game-framework
        this.addSingleModule(new PreloaderPageModule());
        this.addSingleModule(new GamePageModule());
        this.addSingleModule(new TutorialModule());

        // ECS
        this.addSingleModule(new ECSModule());
        this.addSingleModule(new ECSRenderModule());

        // Game-specific
        // this.addSingleModule(new VoronoiModule());
        //
        this.addSingleModule(new GameTutorialModule());
        this.addSingleModule(new TemplateAppModule());
        this.addSingleModule(new GameLogicModule());
        // Save should be the latest one
        this.addSingleModule(new GameSaveModule());
        //
        this.addSingleModule(new GameRendererModule());

        if (IS_DEV) {
            this.addSingleModule(new GameTestModule());
        }

        // setInterval(
        //     () => {
        //         appStorage().change<DeviceModuleState>()("device.pixelRatio", 1);
        //     },
        //     1000
        // );
    }
}