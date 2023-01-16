import { ModuleContainer } from '@/components/ModuleContainer';
import { Module } from '#/Module';
import { FC } from 'react';
import styles from './index.module.scss'

type Props = {
  modules: Module[]
}

export const ViewManager: FC<Props> = ({ modules }) => {
  return (
    <div className={styles.viewManager}>
      {modules.map(({ id, ...props }) => (
        <ModuleContainer {...props} key={id} id={id} />
      ))}
    </div>
  )
}
