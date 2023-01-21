import { useEffect, useState } from 'react';
import { format } from 'date-fns'
import clsx from 'clsx'
import styles from './index.module.scss'
import { ModuleFC } from '#/Module';
import { configItems, DigitalClockConfigValues } from '@/components/modules/DigitalClock/configuration';
import { mdiClockDigital } from '@mdi/js';

type DateParts = {
  year: string;
  month: string;
  day: string;
  dayOfWeek: string;
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
  isAM: boolean;
}

interface DigitalClockProps {
  config: DigitalClockConfigValues;
}

export const DigitalClockModule: ModuleFC<DigitalClockProps> = ({
  config = {}
}) => {
  const [time, setTime] = useState<DateParts>(getDateParts(new Date()))
  const { showSeconds, showDate } = config

  useEffect(() => {
    let timeout: number
    const DELAY = 50

    const getDelay = () => {
      const now = new Date()
      const nextSecond = 1000 - now.getMilliseconds() + DELAY;
      if (showSeconds) return nextSecond;
      else return 60 - now.getSeconds() - 1 + nextSecond;
    }

    const update = () => {
      const now = new Date()
      setTime(getDateParts(now))
      timeout = window.setTimeout(update, getDelay())
    }

    timeout = window.setTimeout(update, getDelay())

    return () => {
      clearTimeout(timeout)
    }
  }, [showSeconds])

  return (
    <div className={styles.clock}>
      <div className={styles.time}>
        <span className={styles.hour}>{time.hours}</span>
        <span className={styles.divider}>:</span>
        <span className={styles.hour}>{time.minutes}</span>
        {showSeconds && (
          <>
            <span className={styles.divider}>:</span>
            <span className={styles.hour}>{time.seconds}</span>
          </>
        )}
        <div className={clsx(styles.ampm, time.isAM ? styles.am : styles.pm)}>
          <span>{time.ampm}</span>
        </div>
      </div>
      {showDate && (
        <div className={styles.date}>
          <span className={styles.dayOfWeek}>{time.dayOfWeek}</span>
          <span className={styles.divider}>{', '}</span>
          <span className={styles.month}>{time.month}</span>
          <span className={styles.divider}>{' '}</span>
          <span className={styles.day}>{time.day}</span>
        </div>
      )}
    </div>
  )
}

DigitalClockModule.moduleName = 'Digital Clock'
DigitalClockModule.moduleDescription = "It's a clock."
DigitalClockModule.moduleConfigFormItems = configItems;
DigitalClockModule.moduleIconPath = mdiClockDigital;

const getDateParts = (date: Date): DateParts => {
  const ampm = format(date, 'a')
  return {
    year: format(date, 'yyyy'),
    month: format(date, 'MMMM'),
    day: format(date, 'd'),
    dayOfWeek: format(date, 'EEEE'),
    hours: format(date, 'h'),
    minutes: format(date, 'mm'),
    seconds: format(date, 'ss'),
    ampm,
    isAM: ampm === 'AM'
  }
}
