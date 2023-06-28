import { BaseAppManager } from "@flashist/appframework/base/managers/BaseAppManager";
import { EventListenerHelper } from "@flashist/fcore";


export class GameStateManager extends BaseAppManager {

    protected curStateEventListenerHelper: EventListenerHelper = new EventListenerHelper(this);

    // // ====================
    // // GAME STATES
    // // ====================

    protected exitCurState(): void {
        this.curStateEventListenerHelper.removeAllListeners();
    }

    // // ====================
    // // WAIT USER INPUT
    // // ====================

    // public enterWaitUserInputState(): void {
    //     this.exitCurState();

    //     appStorage().change<GamePageModuleState>()("gamePage.disableUi", false);
    //     appStorage().change<GameLogicModuleState>()("gameLogic.dynamic.state", GameState.WAIT_USER_ACTION);

    //     // const slotStateData: ISlotServerStateVO = getItemsForType<ISlotServerStateVO>(SlotServerStateType)[0];
    //     // this.uiViewModel.balance = slotStateData.balance;

    //     this.curStateEventListenerHelper.addEventListener(
    //         this.globalDispatcher,
    //         SlotReelsUserSignal.READY_TO_SPIN,
    //         () => {
    //             this.enterReelSpinState();
    //         }
    //     );
    // }

    // // ====================
    // // SPIN BEHAVIOUR
    // // ====================

    // public async enterReelSpinState() {
    //     this.exitCurState();

    //     appStorage().change<GamePageModuleState>()("gamePage.disableUi", true);
    //     appStorage().change<GameLogicModuleState>()("gameLogic.dynamic.state", GameState.SPINNING);

    //     this.startSpin();

    //     this.curStateEventListenerHelper.addEventListener(
    //         this.globalDispatcher,
    //         SlotReelsUserSignal.READY_TO_STOP,
    //         () => {
    //             this.forceStopSpin();
    //         }
    //     );
    // }

    // protected async startSpin(): Promise<void> {
    //     if (this.slotReelTools.getAllReelsState() !== ReelState.STOPPED) {
    //         return;
    //     }
    //     this.isServerResponseReceived = false;

    //     // Visual spin behaviour
    //     this.curSpinCommand = getInstance(SlotReelsSpinBehaviourCommand);
    //     this.curSpinCommand.execute()
    //         .finally(
    //             () => {
    //                 this.exitSpinState();
    //             }
    //         );

    //     // Initiate the start spin behaviour
    //     this.curSpinCommand.startSpin();

    //     if (IS_DEV) {
    //         // TEST
    //         // Randomization of stop positions happens in the prepare-to-start classes,
    //         // so we can stop at any position we want
    //         const stopPositions: number[] = [0, 0, 0, 0, 0];
    //         appStorage().change<SlotReelsModuleState>()("slot.dynamic.stop.positions", stopPositions);
    //         //
    //         // DEBUG - show in the console information about the final symbols on the reels
    //         const serverSymbolIds: string[][] = this.slotReelTools.getReelSymbolIdsFromTapePositions(
    //             this.reelsState.slot.dynamic.reelSetId,
    //             stopPositions
    //         );
    //         const serverSymbolIdsPerColumn: string[][] = MatrixTools.transpose2dMatrix(serverSymbolIds);
    //         //
    //         const label = 'DEBUG';
    //         console.group(label);
    //         console.log("DEBUG: STOP SYMBOL IDS");
    //         console.table(serverSymbolIdsPerColumn);
    //         console.groupEnd();
    //         // TEST - END
    //     }

    //     this.isServerResponseReceived = true;

    //     // Adding timeout to make sure there is some time before the rotation stops
    //     // it's important for improving performance
    //     await TimeoutTools.asyncTimeout(150);
    //     this.stopSpin();
    // }

    // protected exitSpinState(): void {
    //     this.enterWinAnimationState();
    // }

    // protected stopSpin(): void {
    //     if (!this.isServerResponseReceived) {
    //         return;
    //     }

    //     this.curSpinCommand.stopSpin(false);
    // }

    // protected forceStopSpin(): void {
    //     if (!this.isServerResponseReceived) {
    //         return;
    //     }

    //     this.curSpinCommand.stopSpin(true);
    // }


    // // ====================
    // // WIN BEHAVIOUR
    // // ====================

    // public async enterWinAnimationState(): Promise<void> {
    //     this.exitCurState();

    //     if (this.gameState.gameLogic.dynamic.state === GameState.WIN_ANIMATION) {
    //         return;
    //     }
    //     appStorage().change<GameLogicModuleState>()("gameLogic.dynamic.state", GameState.WIN_ANIMATION);

    //     // Calculate Wins
    //     await new TemplateWinStateCommand()
    //         .execute();

    //     let missionOver: boolean = false;
    //     let missionSuccess: boolean = false;
    //     let missionFailed: boolean = false;
    //     if (this.gameLogicTools.getSpinsLeftForActiveMission() <= 0) {
    //         missionOver = true;

    //         if (this.gameLogicTools.getCoinsLeftForActiveMission() <= 0) {
    //             missionSuccess = true;
    //         } else {
    //             missionFailed = true;
    //         }
    //     }

    //     let finishMissionCommands: Command[] = [];
    //     if (missionSuccess) {
    //         if (this.gameLogicTools.getIfLastMission()) {
    //             // alert("LAST MISSION COMPLETE! CREATE POPUP FOR IT!");
    //             this.gameLogicTools.generateNewEndlessMission();
    //         }

    //         finishMissionCommands.push(new MissionSuccessCommand());

    //     } else if (missionFailed) {
    //         finishMissionCommands.push(new MissionFailCommand());
    //     }

    //     //
    //     if (!missionFailed) {
    //         finishMissionCommands.push(new AddSymbolsAfterSpinCommand());
    //     }

    //     new QueueCommand(finishMissionCommands)
    //         .execute()
    //         .then(
    //             () => {
    //                 this.enterWaitUserInputState();
    //             }
    //         );
    // }
}