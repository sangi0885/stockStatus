/* eslint-disable react/jsx-props-no-spreading */
import useCachedState from '$hooks/useCachedState';
import styled from '@emotion/styled';
import { Empty, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import RCTableSearch from './RCTableSearch';
import { tableViewStyle } from './styles';


const paginationConfig = {
  hideOnSinglePage: true,
  showSizeChanger: true,
  pageSizeOptions: [10, 25, 50, 100],
};



// rows is the only prop that has a name that chages
// everything else is being passed through.
const getCacheKey = (tableId, key) =>
  `rctable::${tableId}::${key}`;

const RCTable = ({
  rows,
  ariaLabelledBy,
  emptyText,
  onSearch,
  tableCss,
  searchPlaceholder,
  tableId,
  ...rest
}) => {
  const [search, setSearch] = useState('');
  const [defaultPageSize, setDefaultPageSize] = useCachedState(
    getCacheKey(tableId, 'defaultPageSize'),
    10
  );

  const emptyTextElement = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>{emptyText}</span>
      }
    />
  );

  const locale = useMemo(
    () => (emptyText ? { emptyText: emptyTextElement } : undefined),
    [emptyText]
  );

  const filteredRows = useMemo<RCTableRow[]>(() => {
    if (
      rows &&
      Array.isArray(rows) &&
      Boolean(onSearch) &&
      typeof onSearch === 'function'
    ) {
      return rows.filter((row) => onSearch(row, search));
    }

    return rows;
  }, [rows, onSearch, search]);

  return (
    <>
      <div css={{ ...tableViewStyle, ...tableCss }}>
        {rows &&
          Array.isArray(rows) &&
          Boolean(onSearch) &&
          typeof onSearch === 'function' && (
            <RCTableSearch
              onSearch={setSearch}
              value={search}
              placeholder={searchPlaceholder}
            />
          )}
        {/* @ts-expect-error */}
        <Table
          dataSource={filteredRows}
          pagination={{
            ...paginationConfig,
            hideOnSinglePage: rows.length <= 10,
            defaultPageSize,
            onShowSizeChange: (current, size) => setDefaultPageSize(size),
          }}
          aria-labelledby={ariaLabelledBy}
          locale={locale}
          {...rest}
        />
      </div>
    </>
  );
};

const RCTableStyledDefault = styled(RCTable)(
  (props) =>
    props.theme &&
    props.theme.components && {
      ...props.theme.components.table,
    }
);

export default RCTableStyledDefault;
