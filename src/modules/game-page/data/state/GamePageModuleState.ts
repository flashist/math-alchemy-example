export const GamePageModuleInitialState = {
    gamePage: {
        disableUi: false as boolean,

        numbersListGlobalPos: { x: 0, y: 0 },
        operationsListGlobalPos: { x: 0, y: 0 },
        
        formulaError: {
            visible: false as boolean,
            errorId: "" as string
        },

        popups: {
            settings: {
                visible: false as boolean
            },
            newDiscovery: {
                visible: false as boolean,
                formulaElementId: null as string,
                collectBtnGlobalPos: { x: 0, y: 0 }
            },
            help: {
                visible: false as boolean
            }
        }
    }
};
export type GamePageModuleState = typeof GamePageModuleInitialState;