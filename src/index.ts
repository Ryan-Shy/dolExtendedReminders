var dolExtendedReminders: DolExtendedReminders = globalThis.dolExtendedReminders ?? {};

dolExtendedReminders.loadCSS = function (cssPath: string) {
    const cssNode = document.createElement("link");
    cssNode.rel = "stylesheet";
    cssNode.href = cssPath;
    document.head.appendChild(cssNode);
}

dolExtendedReminders.loadJS = function (scriptPath: string) {
    const jsNode = document.createElement("script");
    jsNode.src = scriptPath;
    document.head.appendChild(jsNode);
}

dolExtendedReminders.init = function () {
    globalThis.dolExtendedReminders = dolExtendedReminders;
    if (!dolExtendedReminders.loadJS || !dolExtendedReminders.loadCSS) {
        console.error("Error loading dolExtendedReminders");
        return;
    }
    // Load CSS

    // Load HTML

    // Load JS
    dolExtendedReminders.loadJS("/dolExtendedReminders/ryanshyLocalStorage.js");

    dolExtendedReminders.loadJS("/dolExtendedReminders/dolExtendedReminders.js");
}

dolExtendedReminders.init();