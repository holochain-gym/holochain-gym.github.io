import { BaseElement } from './utils/base-element';
import { Select } from 'scoped-material-components/mwc-select';
import { ListItem } from 'scoped-material-components/mwc-list-item';
export declare class HolochainPlaygroundSelectDNA extends BaseElement {
    selectDNA(dna: string): void;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-list-item': typeof ListItem;
        'mwc-select': typeof Select;
    };
}
