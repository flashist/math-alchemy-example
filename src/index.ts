// // PWA: START
// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//         navigator.serviceWorker
//             .register(
//                 "./sw.js",
//                 {
//                     scope: "./"
//                 }
//             )
//             .then(res => console.log("service worker registered"))
//             .catch(err => console.log("service worker not registered", err))
//     })
// }
// // PWA: END

import * as PIXI from "pixi.js";

import { v4 as uuidv4 } from "uuid";

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Analytics as FirebaseAnalytics } from "@firebase/analytics";

import { Facade } from "@flashist/appframework/facade/Facade";

import { FLabel } from "@flashist/flibs";
import { TemplateFacade } from "./TemplateFacade";

import { Analytics } from "./modules/analytics/Analytics";
import { AnalyticsEvent } from "./modules/analytics/AnalyticsEvent";

if (!IS_DEV) {
    // TODO: prod-related code (e.g. analytics)
}

// PIXI
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
PIXI.settings.RENDER_OPTIONS.antialias = true;
PIXI.settings.RENDER_OPTIONS.autoDensity = true;
// PIXI.settings.RESOLUTION = 2;

Analytics.logEvent(AnalyticsEvent.GAME_OPEN);

FLabel.DEFAULT_CONFIG.lineJoin = "round";

Facade.init(
    {
        debug: IS_DEV,
        FacadeClass: TemplateFacade
    }
);


// TEST
import mathsteps from "mathsteps";
import Mexp from "math-expression-evaluator";
import * as mathjs from "mathjs";

window["mathsteps"] = mathsteps;
window["Mexp"] = Mexp;
window["mathjs"] = mathjs;