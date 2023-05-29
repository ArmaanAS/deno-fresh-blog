export default function Title() {
  return (
    <a href="/"
      class="p-4 rounded-full border overflow-hidden my-8 shadow-2xl">
      <img
        src="/logo.svg"
        class="w-36 h-36 mx-auto"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1 class="text-6xl font-mono font-bold tracking-tighter text-center text-yellow-600 mb-16">this.blog</h1>
    </a>
  );
}