import React from 'react'

export default function MegaMenu({ columns = [] }) {
  return (
    <div className="mega">
      {columns.map((col, i) => (
        <div className="mega-col" key={i}>
          <div className="mega-title">{col.title}</div>
          <ul>
            {col.items.map((it) => (
              <li key={it}><a href="#!">{it}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
