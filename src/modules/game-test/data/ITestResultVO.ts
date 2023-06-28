export interface ITestResultVO {

    successs: boolean;
    successEmoji: string;

    input: string;
    expect: string;
    output?: string;
    error?: string;
}