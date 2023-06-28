import { BaseAppManager, appStateChangeEvent, appStorage } from "@flashist/appframework";
import { getInstance } from "@flashist/flibs";
import { GamePageGlobalEvent } from "../../game-page/views/GamePageGlobalEvent";
import { GameLogicModuleState } from "../data/state/GameLogicModuleState";
import { IGameTaskVO } from "../data/tasks/IGameTaskVO";
import { GameLogicTools } from "../tools/GameLogicTools";
import { ArrayTools } from "@flashist/fcore";

export class GameTasksManager extends BaseAppManager {

    protected gameLogicState = appStorage().getState<GameLogicModuleState>();
    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            GamePageGlobalEvent.FIRST_INIT_COMPLETE,
            this.updateTasks
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            appStateChangeEvent<GameLogicModuleState>()("gameLogic.dynamic.openElementIds"),
            this.updateTasks
        );
    }

    protected updateTasks(): void {
        this.checkIfNotActiveTasksComplete();

        let newTaskIds: string[] = this.gameLogicState.gameLogic.dynamic.tasks.activeIds.concat();

        // Remove complete tasks
        // Important: we go through one list, but remove ids from another,
        // to make sure all the ids are went through when we delete something from the list
        for (let singleTaskId of this.gameLogicState.gameLogic.dynamic.tasks.activeIds) {
            if (this.gameLogicTools.checkIfTaskElementFound(singleTaskId)) {
                ArrayTools.removeItem(newTaskIds, singleTaskId);
            }
        }

        const maxActiveTasksCount: number = 3;
        // If there are less than max amount of active tasks, try to find new tasks to add
        if (newTaskIds.length < maxActiveTasksCount) {
            const taskIdsReadyToActivate: string[] = this.gameLogicTools.getTaskIdsReadyToActivate();
            // Add more tasks, while we reach the max amount
            // OR there are no more new tasks to add
            const tasksToAddCount: number = Math.min(
                maxActiveTasksCount - newTaskIds.length,
                taskIdsReadyToActivate.length
            );

            for (let taskToAddIndex: number = 0; taskToAddIndex < tasksToAddCount; taskToAddIndex++) {
                const randTaskId: string = ArrayTools.getRandomItem(taskIdsReadyToActivate, newTaskIds);
                newTaskIds.push(randTaskId);
            }
        }

        appStorage().substitute<GameLogicModuleState>()("gameLogic.dynamic.tasks.activeIds", newTaskIds);
    }

    protected checkIfNotActiveTasksComplete(): void {
        let newCompleteTaskIds: string[] = [];

        const allTaskIds: string[] = Object.keys(this.gameLogicState.gameLogic.static.tasks);
        for (let singleTaskId of allTaskIds) {
            // If the objective of a task is done and the task isn't complete yet, then complete it
            if (this.gameLogicTools.checkIfTaskElementFound(singleTaskId)) {
                if (!this.gameLogicTools.checkIfTaskComplete(singleTaskId)) {
                    newCompleteTaskIds.push(singleTaskId);
                }
            }
        }

        appStorage().change<GameLogicModuleState>()("gameLogic.dynamic.tasks.completeIds", newCompleteTaskIds);
    }
}