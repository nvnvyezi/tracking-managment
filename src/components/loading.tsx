import React from 'react'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

export function Loading() {
  React.useEffect(() => {
    // NProgress.start()
    return () => {
      // NProgress.done()
    }
  }, [])

  return <div>Loading</div>
}
