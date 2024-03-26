export const tableViewStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridRowStart: 2,
  gridColumn: '1 / 3',

  '.ant-table-thead > tr > th': {
    padding: '12px 8px'
  },

  'table > thead > tr:first-of-type th:first-of-type, table > thead > tr:last-child th:last-child':
    {
      borderRadius: 0
    },

  table: {
    borderRadius: 0
  }
};
