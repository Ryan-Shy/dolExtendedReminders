export {}

declare global {
    var cw : (
            Window
            & {V?: {[name:string]: any | any[]}}
            )
        | undefined;
    var dolExtendedReminders : DolExtendedReminders;
}