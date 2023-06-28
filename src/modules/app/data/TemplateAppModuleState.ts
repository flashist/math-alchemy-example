import { Rectangle } from "pixi.js";

export const TemplateAppModuleInitialState = {
    app: {
        config: {
            sizeArea: {
                x: 0,
                y: 0,

                // // 16:9 ratio
                // width: 2560,
                // height: 1440

                // 9:16 ratio
                width: 1440,
                height: 2560

            } as Rectangle
        }
    }
};