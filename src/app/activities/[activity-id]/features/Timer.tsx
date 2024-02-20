"use client";

import { PlayIcon, PauseIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import useTimer from "~/hooks/useTimer";
import { Activity } from "../../model";

export default function Timer({ activity }: { activity: Activity }) {
  const now = activity.stopped_at
    ? Date.now() - activity.stopped_at.getTime()
    : Date.now() - activity.started_at.getTime();

  const { time, status, toggleTimer } = useTimer({
    now,
  });

  return (
    <>
      <div className="flex gap-x-4">
        <span suppressHydrationWarning className="text-2xl">
          {time}
        </span>
        <Button variant="outline" onClick={toggleTimer}>
          {status === "play" ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
      <hr className="text-gray-500 w-full" />
    </>
  );
}
