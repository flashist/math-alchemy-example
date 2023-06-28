import { BaseAppCommand, appStorage } from "@flashist/appframework";
import { getInstance } from "@flashist/flibs";
import { GamePageModuleState } from "../../game-page/data/state/GamePageModuleState";
import { GameLogicModuleState } from "../data/state/GameLogicModuleState";
import { NumberId } from "../data/formula/NumberId";
import { OperationId } from "../data/formula/OperationId";


export class TestPrepareDataToStartCommand extends BaseAppCommand {

    // protected ecsManager: ECSManager = getInstance(ECSManager);

    protected executeInternal(): void {

        appStorage().change<GameLogicModuleState>()(
            "gameLogic.dynamic.openElementIds",
            [
                NumberId.ONE,
                OperationId.QUESTION,
                OperationId.EQUAL,
                OperationId.ADDITION
            ]
        );

        //
        // appStorage().change<GamePageModuleState>()(
        //     "gamePage.popups.newDiscovery",
        //     {
        //         visible: true,
        //         formulaElementId: "two"
        //     }
        // );

        // // Player
        // const playerEntity = PlayerFactory.createPlayerEntity(0);
        // this.ecsManager.entities.create(playerEntity);

        // // Enemy #1
        // let enemyEntity = EnemiesFactory.createEnemyEntity(-2);
        // this.ecsManager.entities.create(enemyEntity);
        // // Enemy #2
        // enemyEntity = EnemiesFactory.createEnemyEntity(2);
        // this.ecsManager.entities.create(enemyEntity);

        //
        this.notifyComplete();
    }

    // protected createGameObject(hunterHelperData: IGameObjectsFactoryHelperVO, position?: { x: number, y: number }): GameObjectEntity {
    //     const hunterEntity: IEntity = GameObjectsFactory.createUniqueGameObject(hunterHelperData.hunter.type)
    //     // Position
    //     if (!position) {
    //         hunterEntity.components.position.x = Math.floor(this.gameModuleState.gameLogic.field.x + (Math.random() * this.gameModuleState.gameLogic.field.width));
    //         hunterEntity.components.position.y = Math.floor(this.gameModuleState.gameLogic.field.y + (Math.random() * this.gameModuleState.gameLogic.field.height));
    //     } else {
    //         hunterEntity.components.position.x = position.x;
    //         hunterEntity.components.position.y = position.y;
    //     }

    //     GameLogicTools.correctPosition(hunterEntity as any);

    //     const result: GameObjectEntity = this.ecsManager.entities.create(hunterEntity) as any;
    //     return result;
    // }
}