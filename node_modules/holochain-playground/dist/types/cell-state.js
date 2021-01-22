var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus[ValidationStatus["Valid"] = 0] = "Valid";
    ValidationStatus[ValidationStatus["Rejected"] = 1] = "Rejected";
    ValidationStatus[ValidationStatus["Abandoned"] = 2] = "Abandoned";
})(ValidationStatus || (ValidationStatus = {}));
var ValidationLimboStatus;
(function (ValidationLimboStatus) {
    ValidationLimboStatus[ValidationLimboStatus["Pending"] = 0] = "Pending";
    ValidationLimboStatus[ValidationLimboStatus["AwaitingSysDeps"] = 1] = "AwaitingSysDeps";
    ValidationLimboStatus[ValidationLimboStatus["SysValidated"] = 2] = "SysValidated";
    ValidationLimboStatus[ValidationLimboStatus["AwaitingAppDeps"] = 3] = "AwaitingAppDeps";
})(ValidationLimboStatus || (ValidationLimboStatus = {}));

export { ValidationLimboStatus, ValidationStatus };
//# sourceMappingURL=cell-state.js.map
