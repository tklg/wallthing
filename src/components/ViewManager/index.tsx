import { ModuleContainer } from '@/components/ModuleContainer';
import { FC, useMemo, useState } from 'react';
import GridLayout from 'react-grid-layout';
import styles from './index.module.scss'
import './index.scss'
import { useModuleConfigs, useTapShow, useViewport } from '@/hooks';
import clsx from 'clsx';
import { AddModule } from '@/components/AddModule';

const COLS = 4
const ROWS = 3;
const OFFSETPOINTS = 4;

type Props = {}

export const ViewManager: FC<Props> = () => {
  const modules = useModuleConfigs()
  const {
    show,
    handleClick,
  } = useTapShow(4000)
  const { innerWidth, innerHeight } = useViewport()
  const effectiveRows = ROWS * OFFSETPOINTS
  const effectiveCols = COLS * OFFSETPOINTS

  return (
    <div className={clsx(styles.viewManager, 'view-manager')} onClick={handleClick}>
      <AddModule showButton={show} />
      <GridLayout
        cols={effectiveCols}
        rowHeight={innerHeight / effectiveRows}
        width={innerWidth}
        draggableHandle='.module-drag-handle'
        compactType={null}
        margin={[0, 0]}
        containerPadding={[0, 0]}
        isBounded
      >
        {modules.map(({ id, ...props }) => {
          const position = props.position
          const gridData = {
            i: id,
            x: position.x,
            y: position.y,
            w: position.width,
            h: position.height,
            minW: OFFSETPOINTS,
            minH: OFFSETPOINTS
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
