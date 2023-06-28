export const TemplateSettings = {
    colors: {
        black: 0x212121,
        white: 0xFFFFFF,
        beige: 0xF1E8D6,
        blue: 0x2292A4,
        reddish: 0xBF6956
    },
    fonts: {
        complexFontFamily: "",
        mainFont: "NotoSerif, serif",
        mathFont: "NotoSansMath"
    },
    grid: {
        size: 160
    }
};

TemplateSettings.fonts.complexFontFamily = `${TemplateSettings.fonts.mainFont}, ${TemplateSettings.fonts.mathFont}`;