import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import PlayButton from "./PlayButton";
import { type Activity } from "../model";
import StopButton from "./StopButton";
import { cn } from "~/lib/utils";

export default function ListCard({ activity }: { activity: Activity }) {
  const disabled = !activity.id;
  const disabledTabIndex = disabled ? -1 : 0;

  return (
    <a
      href={`/activities/${activity.id}`}
      tabIndex={disabledTabIndex}
      aria-disabled={disabled}
      className={cn(disabled && "pointer-events-none")}
    >
      <Card className="w-full">
        <CardHeader>
          {activity.status === "playing" && (
            <p className="text-gray-500 text-end text-xs">현재 작업중</p>
          )}
          <CardTitle>{activity.name}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {activity.started_at && (
            <p className="text-gray-500 text-xs">
              시작 {displayDate(activity.started_at)}
            </p>
          )}
          {activity.stopped_at && (
            <p className="text-gray-500 text-xs">
              종료 {displayDate(activity.stopped_at)}
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-end gap-x-2">
          {activity.status === "playing" ? (
            <StopButton activity={activity} tabIndex={disabledTabIndex} />
          ) : (
            <PlayButton activity={activity} tabIndex={disabledTabIndex} />
          )}
        </CardFooter>
      </Card>
    </a>
  );
}

const displayDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 9);

  return date
    .toISOString()
    .substring(0, 19)
    .replace("T", " ")
    .replaceAll("-", ".");
};
