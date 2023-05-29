export default ({ date }: { date: Date; }) => <>
  {new window.Date(date).toLocaleDateString()}
</>;