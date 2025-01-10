var dolExtendedReminders: DolExtendedReminders = globalThis.dolExtendedReminders ?? {};
dolExtendedReminders.settings = dolExtendedReminders.settings ?? {};

dolExtendedReminders.settings.showDaily = true;
dolExtendedReminders.settings.showWeekly = true;
dolExtendedReminders.settings.showThievery = false; // disable by default, like, who robs every store?!
dolExtendedReminders.settings.showAntiques = true;
dolExtendedReminders.settings.showVendingMachine = true;
