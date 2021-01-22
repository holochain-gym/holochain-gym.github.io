export function getSysMetaValHeaderHash(sys_meta_val) {
    if (sys_meta_val.NewEntry)
        return sys_meta_val.NewEntry;
    if (sys_meta_val.Update)
        return sys_meta_val.Update;
    if (sys_meta_val.Delete)
        return sys_meta_val.Delete;
    if (sys_meta_val.Activity)
        return sys_meta_val.Activity;
    return undefined;
}
export var ChainStatus;
(function (ChainStatus) {
    ChainStatus[ChainStatus["Empty"] = 0] = "Empty";
    ChainStatus[ChainStatus["Valid"] = 1] = "Valid";
    ChainStatus[ChainStatus["Forked"] = 2] = "Forked";
    ChainStatus[ChainStatus["Invalid"] = 3] = "Invalid";
})(ChainStatus || (ChainStatus = {}));
export var EntryDhtStatus;
(function (EntryDhtStatus) {
    EntryDhtStatus[EntryDhtStatus["Live"] = 0] = "Live";
    /// This [Entry] has no headers that have not been deleted
    EntryDhtStatus[EntryDhtStatus["Dead"] = 1] = "Dead";
    /// This [Entry] is awaiting validation
    EntryDhtStatus[EntryDhtStatus["Pending"] = 2] = "Pending";
    /// This [Entry] has failed validation and will not be served by the DHT
    EntryDhtStatus[EntryDhtStatus["Rejected"] = 3] = "Rejected";
    /// This [Entry] has taken too long / too many resources to validate, so we gave up
    EntryDhtStatus[EntryDhtStatus["Abandoned"] = 4] = "Abandoned";
    /// **not implemented** There has been a conflict when validating this [Entry]
    EntryDhtStatus[EntryDhtStatus["Conflict"] = 5] = "Conflict";
    /// **not implemented** The author has withdrawn their publication of this element.
    EntryDhtStatus[EntryDhtStatus["Withdrawn"] = 6] = "Withdrawn";
    /// **not implemented** We have agreed to drop this [Entry] content from the system. Header can stay with no entry
    EntryDhtStatus[EntryDhtStatus["Purged"] = 7] = "Purged";
})(EntryDhtStatus || (EntryDhtStatus = {}));
//# sourceMappingURL=metadata.js.map