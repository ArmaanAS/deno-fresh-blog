import { tw } from "twind";

const roundStyle = `rounded-full border-2 border-yellow-200 shadow-md`;
const clearStyle = `mt-4x`;

export default function Title({ clear = false }: { clear?: boolean; }) {
  return (
    <a href="/"
      class={tw(clear ? clearStyle : roundStyle) + " p-4 my-12 flex gap-4 items-center"}>
      <img
        src="/logo.svg"
        class="w-32 h-32 m-auto"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1 class="text-6xl font-mono font-bold tracking-tighter text-center text-yellow-400">this.blog</h1>
    </a>
  );
}