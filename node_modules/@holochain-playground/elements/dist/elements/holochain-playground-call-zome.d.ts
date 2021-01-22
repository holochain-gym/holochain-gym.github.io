import { CellId } from '@holochain-open-dev/core-types';
import { SimulatedZome, SimulatedZomeFunction, Conductor } from '@holochain-playground/core';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { BaseElement } from './utils/base-element';
import { Button } from 'scoped-material-components/mwc-button';
export interface ZomeFunctionResult {
    zome: SimulatedZome;
    fnName: string;
    result: any;
}
export declare class HolochainPlaygroundCallZome extends BaseElement {
    zome: SimulatedZome;
    conductor: Conductor;
    cellId: CellId;
    _results: ZomeFunctionResult[];
    static styles: import("lit-element").CSSResult[];
    _arguments: {};
    callZomeFunction(fnName: string): Promise<void>;
    renderCallableFunction(name: string, zomeFunction: SimulatedZomeFunction): import("lit-element").TemplateResult;
    renderResults(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
    };
}
