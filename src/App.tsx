import { ViewManager } from '@/components/ViewManager';
import styles from './index.module.scss'
import { ModuleConfiguration } from '@/components';
import { AddModule } from '@/components/AddModule';

function App() {
  return (
    <div className={styles.app}>
      <ViewManager />
      <ModuleConfiguration />
    </div>
  )
}

export default App
