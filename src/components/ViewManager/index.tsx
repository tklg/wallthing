import { ModuleContainer } from '@/components/ModuleContainer';
import { FC } from 'react';
import styles from './index.module.scss'
import { useModuleConfigs } from '@/hooks';

type Props = {}

export const ViewManager: FC<Props> = () => {
  const modules = useModuleConfigs()
  return (
    <div className={styles.viewManager}>
      {modules.map(({ id, ...props }) => (
        <ModuleContainer {...props} key={id} id={id} />
      ))}
    </div>
  )
}
