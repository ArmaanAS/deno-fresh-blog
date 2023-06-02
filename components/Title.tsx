import { tw } from "twind";

const roundStyle = `rounded-full border-2 border-yellow-200 shadow-md`;
const clearStyle = ``;

export default function Title({ clear = false }: { clear?: boolean; }) {
  return (
    <a href="/"
      class={tw(clear ? clearStyle : roundStyle) + " p-4 my-12 flex flex-wrap justify-center gap-4 items-center max-w-screen-md"}>
      <img
        src="/logo.svg"
        class="w-20 h-20 sm:(w-24 h-24) md:(w-28 h-28) lg:(w-36 h-36) m-auto"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tighter text-center text-yellow-400">this.blog</h1>
    </a>
  );
}