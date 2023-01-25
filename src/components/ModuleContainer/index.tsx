import { moduleMap } from '@/utils/moduleMap';
import { Module } from '#/Module';
import { mdiCogOutline, mdiTrashCan } from '@mdi/js';
import { Icon } from '@mdi/react';
import { forwardRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import { AppButton } from '@/components/AppButton';
import { useModuleConfig, useModuleConfigDelete, useModuleConfigEditing, useTapShow } from '@/hooks';
import { ConfirmationButton } from '@/components/AppButton/ConfirmationButton';

interface Props extends Module {
}

export const ModuleContainer = forwardRef<HTMLDivElement, Props>(({ position, id, type }, ref) => {
  const Component = moduleMap[type]
  const [, setEditingId] = useModuleConfigEditing()
  const deleteModule = useModuleConfigDelete()
  const { config } = useModuleConfig(id)
  
  const {
    ref: controlsRef,
    show: showControls,
    handleClick, 
    handleMouseOut, 
    handleMouseOver
  } = useTapShow()

  const handleDelete = useCallback(async () => {
    await deleteModule(id)
  }, [id])

  return (
    <div 
      className={styles.moduleContainer} 
      data-module-id={id}
      ref={ref}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {Component && <Component config={config?.values ?? {}} />}
      <CSSTransition
        in={showControls}
        nodeRef={controlsRef}
        timeout={1000}
        classNames={{
          enterActive: styles.controlsEnterActive,
          enterDone: styles.controlsEnterDone,
          exitActive: styles.controlsExitActive,
        }}
      >
        <div
          className={styles.controls}
          key='controls'
          ref={controlsRef}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <ConfirmationButton
            icon={<Icon path={mdiTrashCan}/>} 
            color='error'
            confirmationText='Remove module'
            confirmationDescription={`Are you sure you want to remove this ${Component?.moduleName ?? 'Module'}?`}
            onPressConfirm={handleDelete}
          />
          {Component && Component.moduleConfigFormItems.length > 0 && (
            <AppButton icon={<Icon path={mdiCogOutline}/>} onPress={() => setEditingId(id)} />
          )}
        </div>
      </CSSTransition>
    </div>
  )
})
