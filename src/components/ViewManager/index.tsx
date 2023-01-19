import { ModuleContainer } from '@/components/ModuleContainer';
import { FC, useCallback } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import styles from './index.module.scss'
import './index.scss'
import { useModuleConfigs, useModuleConfigsByKey, useModuleConfigSetPosition, useViewport } from '@/hooks';
import clsx from 'clsx';

const COLS = 4
const ROWS = 3;
const OFFSETPOINTS = 4;

type Props = {}

export const ViewManager: FC<Props> = () => {
  const modules = useModuleConfigs()
  const modulesDict = useModuleConfigsByKey()
  const updateModulePosition = useModuleConfigSetPosition()
  const { innerWidth, innerHeight } = useViewport()
  const effectiveRows = ROWS * OFFSETPOINTS
  const effectiveCols = COLS * OFFSETPOINTS

  const handleLayoutChange = useCallback((layouts: Layout[]) => {
    const changedPositions = layouts.filter(layout => {
      const originalPosition = modulesDict[layout.i]?.position ?? {};
      return layout.x !== originalPosition.x || layout.y !== originalPosition.y || layout.w !== originalPosition.width || layout.h !== originalPosition.height;
    })

    for (const layout of changedPositions) {
      updateModulePosition(layout.i, {
        x: layout.x,
        y: layout.y,
        width: layout.w,
        height: layout.h
      })
    }    
  }, [modulesDict])

  return (
    <div className={clsx(styles.viewManager, 'view-manager')}>
      <GridLayout
        cols={effectiveCols}
        rowHeight={innerHeight / effectiveRows}
        width={innerWidth}
        draggableHandle='.module-drag-handle'
        compactType={null}
        margin={[0, 0]}
        containerPadding={[0, 0]}
        onLayoutChange={handleLayoutChange}
        resizeHandles={['e', 'se', 's']}
        isBounded
        preventCollision
      >
        {modules.map(({ id, ...props }) => {
          const position = props.position
          const gridData = {
            i: id,
            x: position.x,
            y: position.y,
            w: position.width,
            h: position.height,
            minW: 3,
            minH: 3
          }
          return (
            <div            
              key={id}
              data-grid={gridData}
              className='module-drag-handle'
            >
              <ModuleContainer
                {...props}
                id={id}
              />
            </div>
          )
        })}
      </GridLayout>
    </div>
  )
}
