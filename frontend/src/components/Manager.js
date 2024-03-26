/* eslint-disable no-underscore-dangle */
import CommandButton from '$components/commands/CommandButton';
import { useCCSelector } from '$hooks/useCertiCraftReduxHooks';
import getBatchesAndLotsCommands from '$redux/reducers/commands/selectors/getBatchesAndLotsCommands';
import RCTable from '$shared/RCTable';
import RCTableControls from '$shared/RCTable/RCTableControls';
import Spacing from '$shared/Spacing';
import { FormCommandInfo } from '$types/CommandInfo';
import { css } from '@emotion/react';
import { RouteComponentProps } from '@reach/router';
import React, { useCallback, useMemo } from 'react';
import useBatchesTableView, {
  UseBatchesTableView
} from './batchOrLot/hooks/useBatchesTableView';
import useLotsTableView, {
  UseLotsTableView
} from './batchOrLot/hooks/useLotsTableView';

const style = css`
  h3 {
    font-size: 20px;
  }

  .commands {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 12px;
  }

  .ant-table-cell * {
    font-size: 16px;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    background-color: #ffffff6c;
  }
`;

type Props = {
  batchesOrLots: 'batches' | 'lots'
} & RouteComponentProps;

export default function BatchesLotsTable({
  batchesOrLots
}: Props): JSX.Element {
  const [batchesCommands, lotsCommands] = useCCSelector(
    getBatchesAndLotsCommands
  );

  const batchesTable = useBatchesTableView();
  const lotsTable = useLotsTableView();

  const tableProps =
    (useMemo < UseBatchesTableView) |
    (UseLotsTableView >
      (() => (batchesOrLots === 'batches' ? batchesTable : lotsTable),
      [batchesOrLots, batchesTable, lotsTable]));

  const commands: FormCommandInfo[] = useMemo(() => {
    const _commands =
      batchesOrLots === 'batches' ? batchesCommands : lotsCommands;
    return _commands ?? [];
  }, [batchesOrLots, batchesCommands, lotsCommands]);

  const setActive = useCallback(
    (active: boolean) => tableProps?.setActiveOnly?.(active),
    [tableProps]
  );

  const batchOrLot = useMemo(
    () => (batchesOrLots === 'batches' ? 'Batches' : 'Lots'),
    [batchesOrLots]
  );

  return (
    <div css={style}>
      <Spacing vertical={16} />
      <div className="commands">
        {commands.map(command => (
          <CommandButton
            key={command.commandType}
            command={command}
            spacingCss={{ margin: 0 }}
          />
        ))}
      </div>
      <Spacing vertical={24} />
      <div>
        <RCTableControls
          additionalInfo={`Inactive ${batchOrLot} are filtered out by default.`}
        />
        <RCTable
          {...tableProps}
          // @ts-expect-error
          scroll={{ x: 1500 }}
          sticky={{ offsetHeader: 55 }}
        />
      </div>
    </div>
  );
}
