export interface InvitationEvent {
  brideName: string;
  groomName: string;
  eventDate: string;
  calendarDate: string;
  persianDate: string;
  weekday: string;
  day: string;
  monthAndYear: string;
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
}
