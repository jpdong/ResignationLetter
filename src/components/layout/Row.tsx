import React from 'react';

interface RowProps {
  gutter?: [number, number];
  align?: string;
  justify?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ children, style, justify, align, ...props }) => {
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    ...style
  };

  if (justify) {
    rowStyle.justifyContent = justify;
  }

  if (align) {
    rowStyle.alignItems = align;
  }

  return (
    <div className="row" style={rowStyle}>
      {children}
    </div>
  );
};

export default Row;