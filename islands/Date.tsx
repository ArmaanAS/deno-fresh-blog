export default ({ date }: { date: Date; }) => <>
  {new Date(date).toLocaleDateString()}
</>;