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
}