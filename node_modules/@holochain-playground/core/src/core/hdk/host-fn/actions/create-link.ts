import {
  Element,
  Hash,
} from '@holochain-open-dev/core-types';
import { Cell } from '../../../cell';
import {
  buildCreateLink,
  buildShh,
} from '../../../cell/source-chain/builder-headers';
import { putElement } from '../../../cell/source-chain/put';
import { HostFn } from '../../host-fn';

export type CreateLink = (args: {
  base: Hash;
  target: Hash;
  tag: any;
}) => Promise<Hash>;

// Creates a new CreateLink header in the source chain
export const create_link: HostFn<CreateLink> = (
  zome_id: number,
  cell: Cell
): CreateLink => async (args): Promise<Hash> => {
  const createLink = buildCreateLink(
    cell.state,
    zome_id,
    args.base,
    args.target,
    args.tag
  );

  const element: Element = {
    signed_header: buildShh(createLink),
    entry: undefined,
  };
  putElement(element)(cell.state);

  return element.signed_header.header.hash;
};
