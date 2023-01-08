import { ViewManager } from '@/components/ViewManager';
import { Module } from '@/types';
import styles from './index.module.scss'

// console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

const modules: Module[] = [
  {
    id: '0',
    name: 'clock',
    position: {
      x: 12,
      y: 12,
      width: 300,
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
    </div>
  )
}

export default App
