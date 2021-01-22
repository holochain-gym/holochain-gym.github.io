import { Hash } from '@holochain-open-dev/core-types';
import { HostFn } from '../../host-fn';
export declare type CreateEntry = (args: {
    content: any;
    entry_def_id: string;
}) => Promise<Hash>;
export declare const create_entry: HostFn<CreateEntry>;
