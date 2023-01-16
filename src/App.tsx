import { ViewManager } from '@/components/ViewManager';
import { Module, ModuleType } from '#/Module';
import styles from './index.module.scss'
import { ModuleConfiguration } from '@/components';

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
      <ViewManager 
        modules={modules}
      />
      <ModuleConfiguration
        modules={modules}
      />
    </div>
  )
}

export default App
