var dolExtendedReminders: DolExtendedReminders = globalThis.dolExtendedReminders ?? {};
dolExtendedReminders.dolExtendedReminders = dolExtendedReminders.dolExtendedReminders ?? {};

/*
 * Core functions
 */
dolExtendedReminders.dolExtendedReminders.OnLoad = function () {
    // TODO not needed, as we currently don't have a settings UI
}

dolExtendedReminders.dolExtendedReminders.OnIframeLoad = function () {
    if (dolExtendedReminders.dolExtendedReminders?.AddDocumentListener) {
        dolExtendedReminders.dolExtendedReminders.AddDocumentListener();
    }
}

dolExtendedReminders.dolExtendedReminders.AddDocumentListener = function () {
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const targetNode = globalThis.cw.document;
    const config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(dolExtendedReminders.dolExtendedReminders?.OnDocumentChange ?? (()=>{}));
    observer.observe(targetNode, config);
}

dolExtendedReminders.dolExtendedReminders.OnDocumentChange = function () {
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const cw = globalThis.cw;
    const customOverlay = cw.document.getElementById("customOverlay");
    if (customOverlay) {
        if (dolExtendedReminders.dolExtendedReminders?.AddJournalOverlayListener) {
            dolExtendedReminders.dolExtendedReminders.AddJournalOverlayListener();
        }
    } else {
        if (dolExtendedReminders.dolExtendedReminders?.RemoveJournalOverlayListener) {
            dolExtendedReminders.dolExtendedReminders.RemoveJournalOverlayListener();
        }
    }
}

dolExtendedReminders.dolExtendedReminders.AddJournalOverlayListener = function () {
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const cw = globalThis.cw;
    const customOverlay = cw.document.getElementById("customOverlay");
    if (dolExtendedReminders.customOverlay && dolExtendedReminders.customOverlay === customOverlay) {
        return;
    }
    if (!customOverlay) {
        return;
    }
    dolExtendedReminders.customOverlay = customOverlay;
    // add observer
    const config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(dolExtendedReminders.dolExtendedReminders?.OnCustomOverlayChange ?? (()=>{}));
    observer.observe(customOverlay, config);
    dolExtendedReminders.journalObserver = observer;
}

dolExtendedReminders.dolExtendedReminders.RemoveJournalOverlayListener = function () {
    if (!dolExtendedReminders.customOverlay) {
        return;
    }
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const cw = globalThis.cw;
    const customOverlay = cw.document.getElementById("customOverlay");
    if (customOverlay) {
        if (dolExtendedReminders.customOverlay !== customOverlay) {
            // update
            delete dolExtendedReminders.customOverlay;
            dolExtendedReminders.journalObserver?.disconnect();
            delete dolExtendedReminders.journalObserver;
            if (dolExtendedReminders.dolExtendedReminders?.AddJournalOverlayListener) {
                dolExtendedReminders.dolExtendedReminders.AddJournalOverlayListener();
            }
            return;
        } else {
            // still up to date, nothing to do
            return;
        }
    }
    // remove
    delete dolExtendedReminders.customOverlay;
    dolExtendedReminders.journalObserver?.disconnect();
    delete dolExtendedReminders.journalObserver;
}

dolExtendedReminders.dolExtendedReminders.OnCustomOverlayChange = function (mutationList : MutationRecord[], observer : MutationObserver) {
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    if (!dolExtendedReminders.customOverlay) {
        return;
    }
    const cw = globalThis.cw;
    const customOverlay = dolExtendedReminders.customOverlay;
    // check if journal menu, then call method to add to journal
    if (!customOverlay.hasAttribute("data-overlay") || customOverlay.getAttribute("data-overlay") !== "journal") {
        return;
    }
    if (cw.document.getElementById("ryanshy-extended-reminders")) {
        // do not add it twice or more
        return;
    }
    if (dolExtendedReminders.journal?.AddJournal) {
        // add extended reminders
        dolExtendedReminders.journal.AddJournal();
    }
}

dolExtendedReminders.createCW = function () : boolean {
    if (globalThis.cw) {
        return true;
    }
    const dolEmbedded = document.getElementById("dolEmbedded") as HTMLIFrameElement;
    if (!dolEmbedded) {
        return false;
    }

    const cw = dolEmbedded.contentWindow;
    if (!cw) {
        return false;
    }
    globalThis.cw = cw;
    return true;
}

dolExtendedReminders.main = function () {
    if (!dolExtendedReminders.createCW) return;
    dolExtendedReminders.createCW();
    const dolEmbedded = document.getElementById("dolEmbedded") as HTMLIFrameElement;
    if (!dolEmbedded) {
        return false;
    }
    dolEmbedded.addEventListener("load", dolExtendedReminders?.dolExtendedReminders?.OnIframeLoad ?? (()=>{}), false);

    window.addEventListener("load", dolExtendedReminders?.dolExtendedReminders?.OnLoad ?? (()=>{}), false);
}

dolExtendedReminders.main();