import { moduleMap } from '@/utils/moduleMap';
import { Module } from '#/Module';
import { mdiCogOutline, mdiResize } from '@mdi/js';
import Icon from '@mdi/react';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import { AppButton } from '@/components/AppButton';
import { useModuleConfigEditing } from '@/hooks';

type Props = Module & {
}

const CONTROLS_HIDE_DELAY = 3000

export const ModuleContainer: FC<Props> = ({ position, id, type }) => {
  const Component = moduleMap[type]
  const controlsTimerRef = useRef<number>()
  const controlsRef = useRef(null)
  const [showControls, setShowControls] = useState(false)
  const [, setEditingId] = useModuleConfigEditing()

  const style = useMemo(() => {
    return {
      top: position.y,
      left: position.x,
      height: position.height,
      width: position.width
    }
  }, [position])

  const handleClick = useCallback(() => {
    window.clearTimeout(controlsTimerRef.current)
    
    if (!showControls) {
      controlsTimerRef.current = window.setTimeout(() => {
        setShowControls(false)
      }, CONTROLS_HIDE_DELAY)
    }

    setShowControls(!showControls)
  }, [showControls])

  const handleMouseOver = useCallback(() => {
    window.clearTimeout(controlsTimerRef.current)
  }, [])

  const handleMouseOut = useCallback(() => {
    controlsTimerRef.current = window.setTimeout(() => {
      setShowControls(false)
    }, CONTROLS_HIDE_DELAY)
  }, [])

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
          exit: styles.controlsExit,
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
          <AppButton icon={<Icon path={mdiResize}/>} />
          <AppButton icon={<Icon path={mdiCogOutline}/>} onPress={() => setEditingId(id)} />
        </div>
      </CSSTransition>
    </div>
  )
}
