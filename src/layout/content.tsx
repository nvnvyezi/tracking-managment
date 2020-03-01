import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

interface IContentProps {
  className?: string
  children?: React.ReactChild
  crumbData?: {
    label: string
    value: string
  }[]
}

export default function Content({
  children,
  className,
  crumbData,
}: IContentProps) {
  return (
    <main className={className}>
      {!!crumbData?.length && (
        <Breadcrumb style={{ marginBottom: 30 }}>
          {crumbData.map(item => (
            <Breadcrumb.Item key={item.label || item.value}>
              {!!item.label ? (
                <Link to={item.label}>{item.value}</Link>
              ) : (
                item.value
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      {children}
      <style jsx>{`
        main {
          padding: 40px;
        }
      `}</style>
    </main>
  )
}
