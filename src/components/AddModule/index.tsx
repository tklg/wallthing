import { AddModuleModal } from '@/components/AddModule/AddModuleModal';
import { AppButton } from '@/components/AppButton';
import { useTapShow } from '@/hooks';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import { FC, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './index.module.scss'

interface AddModuleProps {
  showButton?: boolean;
}

export const AddModule: FC<AddModuleProps> = ({ showButton }) => {
  const [addingModule, setAddingModule] = useState(false)
  const ref = useRef(null)

  return (
    <div className={clsx(styles.addModuleClickTarget, showButton && styles.active)}>
      <CSSTransition
        in={showButton}
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
