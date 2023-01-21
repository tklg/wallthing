// https://github.com/mrazza/path-data

export enum PathStationEnum {
  Newark = 'newark',
  Harrison = 'harrison',
  JournalSquare = 'journal_square',
  GroveStreet = 'grove_street',
  ExchangePlace = 'exchange_place',
  WorldTradeCenter = 'world_trade_center',
  Newport = 'newport',
  Hoboken = 'hoboken',
  ChristopherStreet = 'christopher_street',
  NinthStreet = 'ninth_street',
  FourteenthStreet = 'fourteenth_street',
  TwentyThirdStreet = 'twenty_third_street',
  ThirtyThirdStreet = 'thirty_third_street',
}

export enum PathEndStationEnum {
  Newark = 'Newark',
  WorldTradeCenter = 'World Trade Center',
  Hoboken = 'Hoboken',
  ThirtyThirdStreet = '33rd Street'
}

export enum PathArrivalStatus {
  OnTime = 'ON_TIME',
  ArrivingNow = 'ARRIVING_NOW',
  Delayed = 'DELAYED'
}

enum PathRouteName {
  NWK_WTC,
  JSQ_33,
  HOB_WTC,
  HOB_33,
  NPT_HOB,
  JSQ_33_HOB
}

export enum PathRouteDirection {
  TO_NJ = 'TO_NJ',
  TO_NY = 'TO_NY'
}

type GpsCoordinates = {
  latitude: number;
  longitude: number;
};

export interface PathStation {
  station: string;
  id: string;
  name: string;
  coordinates: GpsCoordinates,
  platforms: PathPlatform[],
  entrances: PathEntrance[],
  timezone: string;
}

export interface PathPlatform {
  id: string;
  name: string;
  coordinates: GpsCoordinates;
}

export interface PathEntrance {
  id: string;
  name: string;
  coordinates: GpsCoordinates;
}

export interface PathStationRealtimeArrivals {
  upcomingTrains: PathStationRealtimeArrival[];
}

export interface PathStationRealtimeArrival {
  lineName: string;
  lineColors: string[];
  projectedArrival: string;
  lastUpdated: string;
  status: PathArrivalStatus;
  headsign: string;
  route: PathRouteName;
  routeDisplayName: string;
  direction: PathRouteDirection;
}
