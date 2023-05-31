import { apply, tw } from "twind";

const roundStyle = `p-4 rounded-full border overflow-hidden shadow-2xl my-8`;
const clearStyle = `mt-4`;

export default function Title({ clear = false }: { clear: boolean; }) {
  return (
    <a href="/"
      class={tw(clear ? clearStyle : roundStyle)}>
      <img
        src="/logo.svg"
        class="w-36 h-36 mx-auto"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1 class="text-6xl font-mono font-bold tracking-tighter text-center text-yellow-600 mb-16">this.blog</h1>
    </a>
  );
}