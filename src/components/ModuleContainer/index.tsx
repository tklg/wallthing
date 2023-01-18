import { moduleMap } from '@/utils/moduleMap';
import { Module } from '#/Module';
import { mdiCogOutline, mdiResize, mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import { FC, useCallback, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import { AppButton } from '@/components/AppButton';
import { useModuleConfigDelete, useModuleConfigEditing, useTapShow } from '@/hooks';
import { Position } from '#/Position';
import { ConfirmationButton } from '@/components/AppButton/ConfirmationButton';

interface Props extends Module {
}
const defaultPosition: Position = {
  height: 100,
  width: 200,
  x: 0,
  y: 0
}

export const ModuleContainer: FC<Props> = ({ position, id, type }) => {
  const Component = moduleMap[type]
  const [, setEditingId] = useModuleConfigEditing()
  const deleteModule = useModuleConfigDelete()
  const {
    ref: controlsRef,
    show: showControls,
    handleClick, 
    handleMouseOut, 
    handleMouseOver
  } = useTapShow()

  const style = useMemo(() => {
    return {
      top: position.y,
      left: position.x,
      height: position.height,
      width: position.width
    }
  }, [position])

  const handleDelete = useCallback(async () => {
    await deleteModule(id)
  }, [id])

  return (
    <div 
      className={styles.moduleContainer} 
      data-module-id={id} 
      style={style}
      onClick={handleClick}
    >
      {Component && <Component />}
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
          <AppButton icon={<Icon path={mdiResize}/>} />
          <AppButton icon={<Icon path={mdiCogOutline}/>} onPress={() => setEditingId(id)} />
        </div>
      </CSSTransition>
    </div>
  )
}
