import { ScheduleRule } from './schedule-rule';

export interface OrderSchedule {
  rules: ScheduleRule[];
  recurring: boolean;
  description?: string;
}
