import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns'
import styles from './index.module.scss'

export const Clock: FC = () => {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    let timeout: number

    const update = () => {
      setTime(new Date())
      timeout = window.setTimeout(update, 1050)
    }

    const nextSecond = 1000 - new Date().getMilliseconds()
    timeout = window.setTimeout(update, nextSecond)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className={styles.clock}>
      <span className={styles.time}>{format(time, 'hh:mm:ss a')}</span>
    </div>
  )
}
