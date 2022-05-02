import { TextDecoder } from 'text-decoding'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

const getSvgNamesForNodes = () => {
  // this is guesswork. When Figma has two nodes with the same name (say, "Union"),
  // it serialises them into SVG with names "Union" and "Union_2", but it's not
  // clear which one becomes "Union" and which "Union_2". It is theorised that this
  // is done in the same order that .findAll returns, so we make use of that.
  // Figma might decide to change this at any time, of course. It would be much
  // nicer if there were an SVG export option which also serialised getPluginData()
  // data as data-* attributes in the output SVG, but there isn't, yet.
  let names: { [index: string]: any } = {};
  let nameIndices: { [index: string]: any } = {};
  figma.currentPage.findAll().forEach((o: any) => {
    let index = "";
    if (nameIndices[o.name]) {
      index = "_" + (nameIndices[o.name] + 1);
      nameIndices[o.name] += 1
    } else {
      nameIndices[o.name] = 1;
    }
    names[o.name + index] = o;
  });
  return names;
}

const transformSvg = async () => {
  // grab the current page as an SVG
  const im = await figma.currentPage.exportAsync({ format: "SVG", svgIdAttribute: true });
  const svgtext = new TextDecoder("utf-8").decode(im);
  // parse it into a DOM


  const parser = new DOMParser();
  const doc = parser.parseFromString(svgtext, "image/svg+xml");
  // get the calculated names for each Figma node
  const mapping = getSvgNamesForNodes();
  // 
  // 
  // // use the names to pair each SVG element with its corresponding Figma node, and copy some info across
  for (let calculated_svgname in mapping) {
    let svgel = doc.getElementById(calculated_svgname);
    if (!svgel) { continue; }
    const sourceElement = mapping[calculated_svgname]
    svgel.setAttribute("data-figma-nodeid", sourceElement.id);
    const styleObject = figma.getStyleById(sourceElement.fillStyleId) as PaintStyle
    svgel.setAttribute("data-figma-fill-style", styleObject.name);
  }
  // there should now be no SVG elements with an ID but without a nodeid: check, for paranoia
  // DOESN'T WORK WITH CURRENT DOM PARSER
  // const firstUnmatched = doc.querySelector("[id]:not([data-figma-nodeid])");
  // if (firstUnmatched) {
  //   console.warn("Failed to match up the following nodes:", firstUnmatched);
  // }
  // serialise the DOM back into svg text
  const finaltext = new XMLSerializer().serializeToString(doc);
  console.log(finaltext);
}

// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {
  const runMe = async () => {
    try {
      await transformSvg();
      figma.notify("SVG downloaded", {})
    } catch (error) {
      figma.notify("Error generating SVG...", { error: true })
    } finally {
      figma.closePlugin()
    }
  }
  runMe();
} else {
  console.warn("Not a FigJam plugin.")
  figma.closePlugin()
}
