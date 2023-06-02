import { ComponentProps } from "preact";

interface Props extends ComponentProps<"time"> {
  date: Date;
  year?: Intl.DateTimeFormatOptions["year"];
  month?: Intl.DateTimeFormatOptions["month"];
  day?: Intl.DateTimeFormatOptions["day"];
}

export default ({
  date,
  year = "numeric",
  month = "long",
  day = "numeric",
  ...props
}: Props) => (
  <time dateTime={`${date}`} {...props}>
    {new Date(date).toLocaleDateString(undefined, {
      year, month, day
    })}
  </time>
);