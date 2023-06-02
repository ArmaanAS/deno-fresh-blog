import { CSS, KATEX_CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";
import { apply, css, tw } from 'twind/css';
import { yellow } from 'twind/colors';
import type { ComponentProps } from 'preact';

import "prismjs/components/prism-jsx?no-check&pin=v57";
import "prismjs/components/prism-typescript?no-check&pin=v57";
import "prismjs/components/prism-tsx?no-check&pin=v57";
import "prismjs/components/prism-bash?no-check&pin=v57";
import "prismjs/components/prism-powershell?no-check&pin=v57";
import "prismjs/components/prism-json?no-check&pin=v57";
import "prismjs/components/prism-diff?no-check&pin=v57";

interface Props extends ComponentProps<"div"> {
  body: string;
}

const markdownStyles = css({
  "ul li::marker": {
    content: '"—   "',
    color: yellow[600]
  },
  "a:not([href^=\"#\"])": apply`text-gray-900 border-b border-yellow-500 
    hover:border-b-2 hover:no-underline font-semibold
  `,
  ".highlight-source-bash pre::before": {
    content: '"$ "',
    "@apply": "text-yellow-600"
  },
  p: apply`leading-7`,
  blockquote: {
    borderLeftColor: yellow[400] + " !important"
  },
  figure: apply`py-6 px-4 flex flex-col items-center justify-center gap-2`,
  "figure img": apply`rounded-xl`,
  "figure figcaption": apply`text-center text-gray-600 font-thin`,
});

export default function Markdown({
  body, class: className = "", ...props
}: Props) {
  const html = render(body, { allowMath: true, allowIframes: true });

  return (
    <>
      <Head>
        <style>{CSS}{KATEX_CSS}</style>
      </Head>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        class={tw(markdownStyles) + " markdown-body " + className}
        {...props}
      ></div>
    </>
  );
}