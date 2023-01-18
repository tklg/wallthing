import { AddModuleModal } from '@/components/AddModule/AddModuleModal';
import { AppButton } from '@/components/AppButton';
import { useTapShow } from '@/hooks';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './index.module.scss'

export const AddModule = () => {
  const [addingModule, setAddingModule] = useState(false)
  const {
    ref,
    show,
    handleClick,
    handleMouseOut,
    handleMouseOver
  } = useTapShow(4000)

  return (
    <div className={styles.addModuleClickTarget} onClick={handleClick}>
      <CSSTransition
        in={show}
        nodeRef={ref}
        timeout={1000}
        classNames={{
          enterActive: styles.enterActive,
          enterDone: styles.enterDone,
          exitActive: styles.exitActive,
        }}
      >
        <div
          className={styles.addButton}
          key='addmodule'
          ref={ref}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <AppButton
            icon={<Icon path={mdiPlus}/>}
            onPress={() => setAddingModule(true)}
          />
        </div>
      </CSSTransition>

      <AddModuleModal
        open={addingModule}
        onClose={() => setAddingModule(false)}
      />
    </div>
  )
}
