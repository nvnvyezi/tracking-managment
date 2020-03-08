import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

interface ICrumb {
  label: string
  value: string
}

interface IContentProps {
  className?: string
  crumbData?: ICrumb[]
  style?: React.CSSProperties
  children?: React.ReactChild[] | React.ReactChild
}

export default function Content({
  children,
  className,
  crumbData,
}: IContentProps) {
  let crumb: ICrumb[] = [{ label: '/home/welcome', value: '首页' }]
  if (crumbData) {
    crumb = crumb.concat(crumbData)
  }
  return (
    <main className={className}>
      <Breadcrumb style={{ marginBottom: 30 }}>
        {crumb.map(item => (
          <Breadcrumb.Item key={item.label || item.value}>
            {!!item.label ? (
              <Link to={item.label}>{item.value}</Link>
            ) : (
              item.value
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      {children}
      <style jsx>{`
        main {
          padding: 40px;
        }
      `}</style>
    </main>
  )
}
