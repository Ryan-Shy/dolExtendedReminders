/*
 * Type definitions
 */
type DolExtendedReminders = {
    init?: () => void,
    loadJS?: (scriptPath: string) => void,
    loadCSS?: (cssPath: string) => void,
    localStorage?: {
        saveSettings?: (key: string, value: any) => void,
        getSettings?: (key: string) => any,
    },
    journal?: {
        AddJournal?: () => void,
    },
    dolExtendedReminders?: {
        OnIframeLoad?: () => void,
        OnLoad?: () => void,
        OnDocumentChange?: (mutationList : MutationRecord[], observer : MutationObserver) => void,
        OnCustomOverlayChange?: (mutationList : MutationRecord[], observer : MutationObserver) => void,
        AddJournalOverlayListener?: () => void,
        RemoveJournalOverlayListener?: () => void,
        AddDocumentListener?: () => void,
    },
    customOverlay : HTMLElement | undefined;
    journalObserver : MutationObserver | undefined,
    createCW?: () => boolean,
    main?: () => void,
}