import { css } from '@emotion/react';
import React from 'react';
import { AiFillFilter } from 'react-icons/ai';

const style = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  width: 100%;
  background-color: #516878;
  color: white;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 16px;
  gap: 4px;

  .info * {
    font-style: italic;
    font-weight: 300;
  }

  .info {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    button {
      background-color: #687a87;

      span {
        color: white;
      }
    }
  }
`;

function TableControls({ children, additionalInfo }) {
  const icon = <AiFillFilter style={{ margin: '0 5px' }} />;
  return (
    <div css={style}>
      <div className="info">
        <div className="filters">
          <span>{'Please note: the '}</span>
          {icon}
          <span>{' buttons below are filters that you can use'}</span>
        </div>
        {additionalInfo && <i>{additionalInfo}</i>}
      </div>
      {children && <div className="controls">{children}</div>}
    </div>
  );
}

export default TableControls;
