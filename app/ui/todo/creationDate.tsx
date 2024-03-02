'use client';

type interval = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};
const CreationDate = ({
  creatDate,
  className,
}: {
  creatDate: string;
  className?: string;
}) => {
  function IntervalDate(): interval {
    const date1 = new Date();
    const date2 = new Date(creatDate);
    return {
      year: Math.abs(date1.getFullYear()) - Math.abs(date2.getFullYear()),
      month: Math.abs(date1.getMonth()) - Math.abs(date2.getMonth()),
      day: Math.abs(date1.getDay()) - Math.abs(date2.getDay()),
      hours: Math.abs(date1.getHours()) - Math.abs(date2.getHours()),
      minutes: Math.abs(date1.getMinutes()) - Math.abs(date2.getMinutes()),
    };
  }

  return (
    <div className={className}>
      {IntervalDate().hours == 0 ? '' : `${IntervalDate().hours} час`}
      {IntervalDate().minutes == 0
        ? 'Только что'
        : `${IntervalDate().minutes} минут назад`}
    </div>
  );
};

export default CreationDate;
