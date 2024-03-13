'use client'

import React, { FC, PropsWithChildren } from 'react'
import {
  createCache,
  extractStyle,
  StyleProvider,
} from '@ant-design/cssinjs/lib'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  useServerInsertedHTML(() => (
    <style
      id='antd'
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ))
  return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export default AntdProvider