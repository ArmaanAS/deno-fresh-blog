import { JSX } from "preact/jsx-runtime";

type TimeAttrs = JSX.IntrinsicElements["time"];
interface Props extends TimeAttrs {
  date: Date;
}

export default function Date({ date, ...props }: Props) {
  return (
    <time dateTime={`${date}`} {...props}>
      {new window.Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
    </time>
  );
}