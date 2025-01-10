/*
 * Type definitions
 */
type DolExtendedReminders = {
    init?: () => void,
    loadJS?: (scriptPath: string) => void,
    loadCSS?: (cssPath: string) => void,
    settings?: {
        showDaily?: boolean,
        showWeekly?: boolean,
        showThievery?: boolean,
        showAntiques?: boolean,
        showVendingMachine?: boolean,
    }
    localStorage?: {
        saveSettings?: (key: string, value: any) => void,
        getSettings?: (key: string) => any,
    },
    journal?: {
        AddJournal?: () => void,
        AddDaily?: () => void,
        AddWeekly?: () => void,
        dailyList?: JournalEntry[],
        weeklyList?: JournalEntry[],
        genericCheck?: (id: string, type: "daily" | "weekly" | "", checkMethod: (value: any) => boolean, parent: string = "") => boolean,
        insecurityCheck?: (type: InsecurityType = "") => boolean,
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

type JournalEntry = {
    name: string,
    parent: string,
    isDone: () => boolean,
    hasRequirementMet: () => boolean,
    getDetails?: () => any,
}

type InsecurityType = ""
                    | "pregnancy"
                    | "big_breasts"
                    | "small_breasts"
                    | "big_penis"
                    | "small_penis"
