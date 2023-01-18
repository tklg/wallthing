import { ViewManager } from '@/components/ViewManager';
import { Module, ModuleType } from '#/Module';
import styles from './index.module.scss'
import { ModuleConfiguration } from '@/components';
import { AddModule } from '@/components/AddModule';

const modules: Module[] = [
  {
    id: '1',
    type: ModuleType.DigitalClock,
    position: {
      x: 12,
      y: 12,
      width: 500,
      height: 200
    }
  }
]

function App() {
  return (
    <div className={styles.app}>
      <AddModule />
      <ViewManager />
      <ModuleConfiguration />
    </div>
  )
}

export default App
