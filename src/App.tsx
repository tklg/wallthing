import { ViewManager } from '@/components/ViewManager';
import styles from './index.module.scss'
import { ModuleConfiguration } from '@/components';
import { AddModule } from '@/components/AddModule';
import { useTapShow } from '@/hooks';

function App() {
  const { show, handleClick } = useTapShow(4000)
  return (
    <div className={styles.app} onClick={handleClick}>
      <AddModule showButton={show} />
      <ViewManager />
      <ModuleConfiguration />
    </div>
  )
}

export default App
