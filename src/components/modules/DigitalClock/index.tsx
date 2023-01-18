import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns'
import clsx from 'clsx'
import styles from './index.module.scss'
import { ModuleFC } from '#/Module';
import { configItems } from '@/components/modules/DigitalClock/configuration';
import Icon from '@mdi/react';
import { mdiClockDigital } from '@mdi/js';
import { SvgWithId } from '@/components/SvgWithId';

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

export const DigitalClock: ModuleFC = () => {
  const [time, setTime] = useState<DateParts>(getDateParts(new Date()))

  useEffect(() => {
    let timeout: number
    const DELAY = 50

    const update = () => {
      const now = new Date()
      setTime(getDateParts(now))
      const delay = 1000 - now.getMilliseconds() + DELAY
      timeout = window.setTimeout(update, delay)
    }

    const nextSecond = 1000 - new Date().getMilliseconds() + DELAY
    timeout = window.setTimeout(update, nextSecond)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className={styles.clock}>
      <div className={styles.time}>
        <span className={styles.hour}>{time.hours}</span>
        <span className={styles.divider}>:</span>
        <span className={styles.hour}>{time.minutes}</span>
        <span className={styles.divider}>:</span>
        <span className={styles.hour}>{time.seconds}</span>
        <div className={clsx(styles.ampm, time.isAM ? styles.am : styles.pm)}>
          <span>{time.ampm}</span>
        </div>
      </div>
      <div className={styles.date}>
        <span className={styles.dayOfWeek}>{time.dayOfWeek}</span>
        <span className={styles.divider}>{', '}</span>
        <span className={styles.month}>{time.month}</span>
        <span className={styles.divider}>{' '}</span>
        <span className={styles.day}>{time.day}</span>
      </div>
    </div>
  )
}

DigitalClock.moduleName = 'Digital Clock'
DigitalClock.moduleDescription = "It's a clock."
DigitalClock.configFormItems = configItems;
DigitalClock.moduleIconPath = mdiClockDigital;

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
