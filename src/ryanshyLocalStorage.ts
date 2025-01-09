var dolExtendedReminders: DolExtendedReminders = globalThis.dolExtendedReminders ?? {};
dolExtendedReminders.localStorage = dolExtendedReminders.localStorage ?? {};

/*
 * Local Storage
 */
dolExtendedReminders.localStorage.saveSettings = function (key: string, value: any) {
    if (typeof key !== 'string' || !key.trim()) {
        console.error('Invalid key. It must be a non-empty string.');
        return;
    }

    try {
        const settings = JSON.stringify(value);
        localStorage.setItem(key, settings);
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}

dolExtendedReminders.localStorage.getSettings = function (key: string) : any {
    if (typeof key !== 'string' || !key.trim()) {
        console.error('Invalid key. It must be a non-empty string.');
        return null;
    }

    try {
        const settings = localStorage.getItem(key);
        return settings ? JSON.parse(settings) : null;
    } catch (error) {
        console.error('Failed to retrieve settings:', error);
        return null;
    }
}
