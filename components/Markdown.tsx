import { JSX } from 'preact/jsx-runtime';
import { tw } from "twind";
import { css, apply } from "twind/css";

type DivAttrs = JSX.IntrinsicElements["div"];
interface Props extends DivAttrs {
  html: string;
}

const globalStyles = css({
  "[class^=language-],[class*= language-]": apply`
      font-mono text-sm text-gray-800 bg-gray-100
      rounded-md px-4 py-3 border border-gray-200 
    `,
  ".language-bash::before": {
    content: '"$ "',
    "@apply": `text-red-500`
  },
  // ".language-bash::after": {
  //   content: '"Copy"',
  //   "@apply": `
  //     float-right ml-1 rounded-md px-2 py-1 text-sm cursor-pointer
  //     text-gray-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-300
  //     border border-gray-300 hover:border-gray-400
  //   `
  // },
  a: apply`border-b border-yellow-600 text-gray-900 font-semibold hover:text-black hover:border-yellow-700 hover:border-b-2`,
  h1: apply`text-4xl font-bold text-neutral-900`,
  h2: apply`text-3xl font-bold text-neutral-900`,
  h3: apply`text-2xl font-bold text-neutral-900`,
  h4: apply`text-xl font-bold text-neutral-900`,
  h5: apply`text-lg font-bold text-neutral-900`,
  h6: apply`text-base font-bold text-neutral-900`,
  p: apply`text-base text-gray-700`,
  ul: apply`list-disc list-inside`,
  ol: apply`list-decimal list-inside`,
  blockquote: apply`border-l-4 border-yellow-600 pl-4`,
  code: apply`bg-gray-100 rounded-md py-0.5 px-1 mx-0.5`,
  pre: apply`rounded-md`,
  hr: apply`border-gray-200 my-6`,
  table: apply`w-full border-collapse border border-gray-200`,
  th: apply`border border-gray-200 px-4 py-2`,
  td: apply`border border-gray-200 px-4 py-2`,
  "th:first-child,td:first-child": apply`pl-4`,
  "th:last-child,td:last-child": apply`pr-4`,
  "@apply": "flex flex-col gap-6 leading-7"
});

export default function Markdown(props: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.html }}
      class={tw(globalStyles) + " prose prose-sm sm:prose lg:prose-lg xl:prose-xl"}
    ></div>
  );
}