import { useCCSelector } from '$hooks/useCertiCraftReduxHooks';
import { selectCultivarsState } from '$redux/reducers/cultivars/selectors';
import { queryStates } from '$redux/types/QueryUpdate';
import BatchOrLotLink from '$shared/BatchOrLotLink';
import { RCTableRow } from '$shared/RCTable';
import {
    buildDefaultDateFilter,
    buildDefaultTableColumnFilterProps,
    buildDefaultTableSorter,
    buildTagRenderWithColors,
    renderDefaultDateColumn,
} from '$shared/RCTable/RCTableColumnRenders';
import {
    ReadableBatchType,
    readableBatchTypes
} from '$types/Batch';
import { TableViewModel } from '$types/TableViewModel';
import { TableProps } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

type BatchTableRow = RCTableRow & {
  id: string;
  cultivar: string;
  dateCreated?: number;
  batchType: ReadableBatchType;
  status: 'Active' | 'Inactive';
  link: string;
};

export type UseBatchesTableView = TableViewModel & {
  onChange: TableProps<BatchTableRow>['onChange'];
  setActiveOnly: (active: boolean) => void;
  filteredInfo: Record<string, FilterValue | null>;
};

export default function (): UseBatchesTableView {
  // By default it's filting only active items
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({ status: ['Active'] });

  const { byId: cultivarsById } = useSelector(selectCultivarsState);
  const { byId: batchesById, queryState } = useCCSelector(
    (state) => state.batches
  );

  const rows = useMemo<BatchTableRow[]>(
    () =>
      Object.values(batchesById).map((batch) => {
        const cultivar = cultivarsById?.[batch.cultivarId];

        return {
          key: batch.batchId,
          id: batch.batchId,
          cultivar: cultivar?.name ?? 'loading...',
          dateCreated: batch.dateCreated
            ? new Date(batch.dateCreated).getTime()
            : undefined,
          batchType: readableBatchTypes[batch.batchType],
          status: batch.isActive ? 'Active' : 'Inactive',
          link: batch.batchId,
        };
      }),
    [batchesById, cultivarsById]
  );

  const columns = useMemo(() => {
    const cultivars = Object.values(cultivarsById);

    const columnsArray = [
      {
        title: 'Batch ID',
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
        width: 200,
      },
      {
        title: 'Cultivar',
        dataIndex: 'cultivar',
        key: 'cultivar',
        width: 250,
        filterSearch: true,
        filteredValue: filteredInfo.cultivar || null,
        ...buildDefaultTableColumnFilterProps({
          dataIndex: 'cultivar',
          values: cultivars.map((cultivar) => cultivar.name),
        }),
      },
      {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        width: 200,
        defaultSortOrder: 'descend',
        filteredValue: filteredInfo.dateCreated || null,
        render: renderDefaultDateColumn,
        ...buildDefaultDateFilter('dateCreated'),
      },
      {
        title: 'Batch Type',
        dataIndex: 'batchType',
        key: 'batchType',
        width: 200,
        filteredValue: filteredInfo.batchType || null,
        render: buildTagRenderWithColors({
          [readableBatchTypes.seeds]: 'orange',
          [readableBatchTypes.flowering]: 'magenta',
          [readableBatchTypes.mothers]: 'green',
          [readableBatchTypes.vegetative]: 'lime',
          [readableBatchTypes.productionPlants]: 'cyan',
        }),
        ...buildDefaultTableColumnFilterProps({
          dataIndex: 'batchType',
          values: Object.values(readableBatchTypes),
        }),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 180,
        filteredValue: filteredInfo.status || null,
        render: buildTagRenderWithColors({
          Active: 'green',
          Inactive: 'red',
        }),
        ...buildDefaultTableColumnFilterProps({
          dataIndex: 'status',
          values: ['Active', 'Inactive'],
        }),
      },
      {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        fixed: 'right',
        width: 200,
        render: (id) => (
          <BatchOrLotLink batchOrLotKey={{ batchOrLot: 'batch', id }} />
        ),
      },
    ];

    return columnsArray.map((col) => {
      if (col.dataIndex === 'link') return col;

      return {
        ...col,
        sorter: buildDefaultTableSorter(col),
      };
    });
  }, [cultivarsById, filteredInfo]);

  const setActiveOnly = (active) => {
    setFilteredInfo((filtered) => ({
      ...filtered,
      status: [active ? 'Active' : 'Inactive'],
    }));
  };

  const onChange = (_, filters) => {
    setFilteredInfo(filters);
  };

  return {
    loading: [queryState].some((q) => q === queryStates.requested),
    rows,
    columns,
    onChange,
    filteredInfo,
    setActiveOnly,
    tableId: 'role-table',
  };
}
