import moment = require("moment");
export interface UserSearchQuery {
  time_format: moment.unitOfTime.DurationConstructor;
  start: number;
  end: number;
  name: string;
}

export interface PrismaQuery {
  created_at?: Date;
  name?: string;
}
