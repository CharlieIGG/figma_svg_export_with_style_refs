var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {
    const runMe = () => __awaiter(void 0, void 0, void 0, function* () {
        let test = yield figma.currentPage.exportAsync({ format: "SVG", svgIdAttribute: true });
        //  const svgtext = new TextDecoder("utf-8").decode(test);
        //  console.log(svgtext)
        console.log("svgtext");
        figma.closePlugin();
    });
    runMe();
}
else {
    console.log(figma.currentPage.selection.map(item => item.text.characters));
    figma.closePlugin();
}
export {};
