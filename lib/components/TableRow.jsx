import React, { Component } from 'react'

const debug = require('debug')('pt:TableRow')

export const TableRow = ({
  children,
  isHorizontal,
  noRule
}) => {
  return <>
    <div
      className={`flex ${isHorizontal ? '' : 'flex-col'} text-center justify-center items-center w-auto p-4`}
    >
      {children}
    </div>
    {!noRule && <div>
      <hr
        style={{
          borderTop: '2px solid #f2f2f2',
          height: 1,
          margin: '5px auto',
          width: '80%'
        }}
      />
    </div>}
  </>
}