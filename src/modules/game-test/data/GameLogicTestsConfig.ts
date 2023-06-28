import { ITestConfig } from "./ITestConfig";

export const GameLogicTestsConfig = {
    tests: [

        // All operations in 1 formula
        {
            // input: "root25+1+4*3/2-5^2+3!-0.5+sin270-cos60-tan135+log100000=x",
            input: "root25+1+4*3/2-5^2+3!-0.5=x",
            expect: "-7.5"
        },

        // Addition
        {
            input: "1x2=3",
            expect: "+"
        },
        {
            input: "1+1=x",
            expect: "2"
        },
        {
            input: "2+x=3",
            expect: "1"
        },

        // Substraction
        {
            input: "1x2=-1",
            expect: "-"
        },
        {
            input: "1-1=x",
            expect: "0"
        },
        {
            input: "5-x=3",
            expect: "2"
        },

        // Multiplication
        {
            input: "2x3=6",
            expect: "*"
        },
        {
            input: "4*5=x",
            expect: "20"
        },
        {
            input: "5*x=15",
            expect: "3"
        },

        // Division
        {
            input: "6x3=2",
            expect: "/"
        },
        {
            input: "40/5=x",
            expect: "8"
        },
        {
            input: "15/x=5",
            expect: "3"
        },

        // Exponentiation
        {
            input: "6x2=36",
            expect: "^"
        },
        {
            input: "x^3=27",
            expect: "3"
        },
        {
            input: "1+x^3=28",
            expect: "3"
        },
        {
            input: "2^3=x",
            expect: "8"
        },
        {
            input: "1+3^x=28",
            expect: "3"
        },
        {
            input: "3^x=27",
            expect: "3"
        },

        // Square Root
        {
            input: "x9=3",
            expect: "root"
        },
        {
            input: "root9=x",
            expect: "3"
        },
        {
            input: "rootx=4",
            expect: "16"
        },
        {
            input: "10+rootx=15",
            expect: "25"
        },

        // Factorial
        {
            input: "4x=24",
            expect: "!"
        },
        {
            input: "3!=x",
            expect: "6"
        },
        {
            input: "x!=120",
            expect: "5"
        },
        {
            input: "1000-x!=280",
            expect: "6"
        },

        // Decimal Dot
        {
            input: "2/4=0x5",
            expect: "."
        },
        {
            input: "0x5=0.5",
            expect: "."
        },
        {
            input: "x.5=0.5",
            expect: "0"
        },
        {
            input: "1+x.6=4.6",
            expect: "3"
        },
        {
            input: "2.3=x",
            expect: "2.3"
        },
        {
            input: "5+3.x=8.7",
            expect: "7"
        },
        {
            input: "10.x=10.1",
            expect: "1"
        },


        // // Sine
        // {
        //     input: "x270=-1",
        //     expect: "sin"
        // },
        // {
        //     input: "sin180=x",
        //     expect: "0"
        // },
        // {
        //     input: "sinx=1",
        //     expect: "90"
        // },
        // {
        //     input: "10+sinx=10.5",
        //     expect: "30"
        // },


        // // Cosine
        // {
        //     input: "x60=0.5",
        //     expect: "cos"
        // },
        // {
        //     input: "cos180=x",
        //     expect: "-1"
        // },
        // {
        //     input: "cosx=1",
        //     expect: "0"
        // },
        // {
        //     input: "10+cosx=9.5",
        //     expect: "120"
        // },

        // // Tangent
        // {
        //     input: "x45=1",
        //     expect: "tan"
        // },
        // {
        //     input: "tan135=x",
        //     expect: "-1"
        // },
        // {
        //     input: "tanx=1",
        //     expect: "45"
        // },
        // {
        //     input: "10+tanx=9",
        //     expect: "-45"
        // },

        // // Log
        // {
        //     input: "x100=2",
        //     expect: "log"
        // },
        // {
        //     input: "log1000=x",
        //     expect: "3"
        // },
        // {
        //     input: "logx=1",
        //     expect: "10"
        // },
        // {
        //     input: "10+logx=14",
        //     expect: "10000"
        // },

        // TODO: ADD ERROR-CREATING TESTS! TESTS WHICH ARE SUPPOSED NOT TO COMPUTE FORMULAS
    ] as ITestConfig[]
}