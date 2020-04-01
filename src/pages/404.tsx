import React from 'react'

import block from '@Images/404.png'

export default function Block() {
  return (
    <div>
      <img src={block} alt="404" />
      <style jsx>{`
        img {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
