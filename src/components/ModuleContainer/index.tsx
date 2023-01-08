import { moduleNameMap } from '@/components/ModuleContainer/moduleNameMap';
import { Module } from '@/types';
import { FC, useMemo } from 'react';
import styles from './index.module.scss'

type Props = Module & {
  
}

export const ModuleContainer: FC<Props> = ({ position, id, name }) => {
  const Component = moduleNameMap[name]

  const style = useMemo(() => {
    return {
      top: position.y,
      left: position.x,
      height: position.height,
      width: position.width
    }
  }, [position])

  return (
    <div className={styles.moduleContainer} data-module-id={id} style={style}>
      <Component />
    </div>
  )
}
