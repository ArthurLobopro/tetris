import NunitoFont from "@electron-fonts/nunito";
import PressStart2PFont from "@electron-fonts/press-start-2p";

window.addEventListener("DOMContentLoaded", () => {
    NunitoFont.inject();
    PressStart2PFont.inject();

    require("../render/main");
});
