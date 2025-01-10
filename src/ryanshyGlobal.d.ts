export {}

declare global {
    var cw : (
            Window
            & {V?: {[name:string]: any | any[]}}
            & {Time?: {[name:string]: any | any[]}}
            & {C?: {[name:string]: any | any[]}}
            & {Weather?: {[name:string]: any | any[]}}
            )
        | undefined;
    var dolExtendedReminders : DolExtendedReminders;
}