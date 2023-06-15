import { tw } from "twind";

const roundStyle = `my-12 rounded-full border-2 border-yellow-400 shadow-xl`;
const clearStyle = `mt-8`;

export default function Title({ clear = false }: { clear?: boolean; }) {
  return (
    <a href="/"
      class={tw(clear ? clearStyle : roundStyle) + " py-4 px-8 flex flex-wrap justify-center gap-4 items-center max-w-screen-md"}>
      <img
        src="/logo.svg"
        class="w-20 h-20 sm:(w-24 h-24) md:(w-28 h-28) lg:(w-36 h-36) m-auto brightness-50"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tighter text-center text-yellow-500">this.blog</h1>
    </a>
  );
}