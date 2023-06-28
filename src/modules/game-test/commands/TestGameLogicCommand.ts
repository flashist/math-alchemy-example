import { BaseAppCommand } from "@flashist/appframework";
import { getInstance } from "@flashist/flibs";
import { GameLogicTools } from "../../game-logic/tools/GameLogicTools";
import { IComputeFormulaResultVO } from "../../game-logic/tools/IComputeFormulaResultVO";
import { GameLogicTestsConfig } from "../data/GameLogicTestsConfig";
import { ITestConfig } from "../data/ITestConfig";
import { ITestResultVO } from "../data/ITestResultVO";

export class TestGameLogicCommand extends BaseAppCommand {

    protected gameLogicTools: GameLogicTools = getInstance(GameLogicTools);

    protected executeInternal(): void {

        const consoleTimerId: string = "TestGameLogicCommand";
        console.time(consoleTimerId);

        const failedTests: ITestResultVO[] = [];

        const testResultsForTable: ITestResultVO[] = [];
        for (let singleTestConfig of GameLogicTestsConfig.tests) {
            let singleTestResult: ITestResultVO = {
                successs: false,
                successEmoji: "❌",

                input: singleTestConfig.input,
                expect: singleTestConfig.expect
            };

            try {
                const tempFormulaResult: IComputeFormulaResultVO = this.gameLogicTools.computeFormula(singleTestConfig.input);
                singleTestResult.output = tempFormulaResult.formulaValue;
                singleTestResult.error = tempFormulaResult.errorId;

                if (tempFormulaResult.formulaValue === singleTestConfig.expect) {
                    this.processPassedTest(singleTestConfig, tempFormulaResult.formulaValue);
                    singleTestResult.successs = true;
                    singleTestResult.successEmoji = "✅";

                } else {
                    this.processFailedTest(singleTestConfig, tempFormulaResult.formulaValue);
                }

            } catch (error) {
                this.processFailedTest(singleTestConfig, null, error);
                singleTestResult.error = error.toString();
            }

            testResultsForTable.push(singleTestResult);
            if (!singleTestResult.successs) {
                failedTests.push(singleTestResult);

                // Call compute again to be able to debug it with breakpoints
                this.gameLogicTools.computeFormula(singleTestConfig.input);
            }
        }

        console.table(testResultsForTable);
        if (failedTests.length > 0) {
            const failedTestInputs: string[] = failedTests.map((item: ITestConfig) => item.input);
            const failedTestsAlertText: string = failedTestInputs.join();
            alert("TESTS FAILED! TESTS: " + failedTestsAlertText);
        } else {
            console.log(" ");
            console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
            console.log("ALL TESTS ARE PASSED");
            console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
            console.log(" ");
        }

        console.timeLog(consoleTimerId);

        this.notifyComplete();
    }

    protected processFailedTest(testConfig: ITestConfig, result: string, error?: any): void {
        // console.error("TEST FAILED! testConfig: ", testConfig, " | result: ", result, " | error: ", error);
    }

    protected processPassedTest(testConfig: ITestConfig, result: string): void {
        // console.log("TEST PASSED! testConfig: ", testConfig, " | result: ", result);
    }
}