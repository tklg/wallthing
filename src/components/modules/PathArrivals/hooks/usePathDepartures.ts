import { PathRouteDirection, PathStationEnum, PathStationRealtimeArrival, PathStationRealtimeArrivals } from '@/components/modules/PathArrivals/types/path-data';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { compareAsc, parseISO } from 'date-fns';

const PATH_API = 'https://path.api.razza.dev/v1';
const REFRESH_INTERVAL = 1000 * 60;

interface UsePathUpcomingTrainsProps {
  station: PathStationEnum;
}

interface UsePathArrivalsProps {
  station: PathStationEnum;
  direction: PathRouteDirection;
}

const routes: PathStationEnum[][] = [
  [PathStationEnum.Newark, PathStationEnum.Harrison, PathStationEnum.JournalSquare, PathStationEnum.GroveStreet, PathStationEnum.ExchangePlace, PathStationEnum.WorldTradeCenter],
  [PathStationEnum.JournalSquare, PathStationEnum.GroveStreet, PathStationEnum.Newport, PathStationEnum.ChristopherStreet]
];

const usePathUpcomingTrains = ({
  station
}: UsePathUpcomingTrainsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trains, setTrains] = useState<PathStationRealtimeArrival[]>([]);

  useEffect(() => {
    let timeout: number;
    const refresh = async () => {
      try {
        setLoading(true);
        const res = await axios.get<PathStationRealtimeArrivals>(`${PATH_API}/stations/${station}/realtime`);
        setTrains(res.data.upcomingTrains);
      } catch (e: any) {
        setError(e.status + ' ' + JSON.stringify(e.response.data));
      } finally {
        setLoading(false);

        timeout = window.setTimeout(refresh, REFRESH_INTERVAL);
      }
    };
    refresh();

    return () => {
      window.clearTimeout(timeout);
    };
  }, [station]);

  return useMemo(() => ({
    loading, error, trains
  }), [loading, error, trains]);
};

export const usePathArrivals = ({
  station,
  direction
}: UsePathArrivalsProps) => {
  const {
    loading, error, trains
  } = usePathUpcomingTrains({ station });

  const matchingTrains = useMemo(() => {
    return trains.filter(train => !direction ? true : train.direction === direction)
      .sort((a, b) => compareAsc(parseISO(a.projectedArrival), parseISO(b.projectedArrival)));
  }, [trains, direction]);

  return useMemo(() => ({
    loading, error, trains: matchingTrains
  }), [loading, error, matchingTrains]);
};
