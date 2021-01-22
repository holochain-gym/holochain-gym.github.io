import { Hash } from '@holochain-open-dev/core-types';
import { HostFn } from '../../host-fn';
export declare type CreateLink = (args: {
    base: Hash;
    target: Hash;
    tag: any;
}) => Promise<Hash>;
export declare const create_link: HostFn<CreateLink>;
