export const GameSaveStorageInitialVO = {
    gameLogic: {
        dynamic: {
            openElementIds: [] as string[],

            tasks: {
                activeIds: [] as string[],
                completeIds: [] as string[],
            }
        }
    }
};

export type GameSaveStorageVO = typeof GameSaveStorageInitialVO;