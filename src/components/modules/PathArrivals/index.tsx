import { ModuleFC } from '#/Module';
import { configItems } from '@/components/modules/PathArrivals/configuration';
import { usePathArrivals } from '@/components/modules/PathArrivals/hooks/usePathDepartures';
import { PathRouteDirection, PathStationEnum, PathArrivalStatus } from '@/components/modules/PathArrivals/types/path-data';
import { mdiSubwayVariant } from '@mdi/js';
import { Loading, Text } from '@nextui-org/react';
import { format, formatRelative, parseISO } from 'date-fns';
import { CSSProperties } from 'react';
import styles from './index.module.scss'

interface PathArrivalsModuleProps {
}

export const PathArrivalsModule: ModuleFC<PathArrivalsModuleProps> = ({
  config = {}
}) => {
  const { trains, loading, error } = usePathArrivals({
    station: PathStationEnum.Harrison,
    direction: config.direction as PathRouteDirection ?? null
  })
  const firstTrain = trains[0]

  return (
    <div className={styles.pathDepartures}>
      {loading && !trains.length && (
        <Loading>Loading arrivals</Loading>
      )}
      {trains.length > 0 && (
        <>
          <header
            className={styles.first}
            style={{
              '--path-line-color': firstTrain.lineColors[0]
            } as CSSProperties}
          >
            <Text h2 className={styles.lineName}>{firstTrain.lineName}</Text>
            <div className={styles.details}>
              <Text className={styles.arrivingAt}>
                {firstTrain.status === PathArrivalStatus.ArrivingNow ? (
                  <>
                    Arriving now
                  </>
                ) : (
                  <>
                    Arriving at{' '}
                    <span className={styles.time}>{format(parseISO(firstTrain.projectedArrival), 'h:mm')}</span>
                  </>
                )}
              </Text>
              {firstTrain.status !== PathArrivalStatus.ArrivingNow && <Text className={styles.status}>{statusToString[firstTrain.status]}</Text>}
            </div>
          </header>
          
          <Text className={styles.comingUp}>Coming up:</Text>
          <ul className={styles.list}>
            {trains.slice(1).map(train => (
              <li
                className={styles.trainRow}
                key={train.routeDisplayName + train.projectedArrival}
                style={{
                  '--path-line-color': train.lineColors[0]
                } as CSSProperties}
              >
                <Text h2 className={styles.lineName}>{train.lineName}</Text>
                <div className={styles.details}>
                  <Text className={styles.arrivingAt}>
                    at {' '}
                    <span className={styles.time}>{format(parseISO(train.projectedArrival), 'h:mm')}</span>
                  </Text>
                </div>
              </li>
            ))}
          </ul>
          <footer className={styles.footer}>
            <Text span className={styles.lastUpdated}>Last updated {formatRelative(parseISO(firstTrain.lastUpdated), new Date())}</Text>
            {loading && <Loading size='xs' color='secondary' />}
          </footer>
        </>
      )}
    </div>
  )
}

const statusToString = {
  [PathArrivalStatus.OnTime]: 'On time',
  [PathArrivalStatus.Delayed]: 'Delayed',
  [PathArrivalStatus.ArrivingNow]: 'Arriving now'
}

PathArrivalsModule.moduleName = 'PATH Arrivals'
PathArrivalsModule.moduleDescription = 'Shows the arrival times of PATH trains at a station.'
PathArrivalsModule.moduleIconPath = mdiSubwayVariant
PathArrivalsModule.moduleConfigFormItems = configItems
