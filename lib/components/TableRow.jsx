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
          margin: '5px auto',
          width: '80%'
        }}
      />
    </div>}
  </>
}