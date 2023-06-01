import { JSX } from 'preact/jsx-runtime';
import { CSS, KATEX_CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";
import { apply, css, tw } from 'twind/css';

import "prismjs/components/prism-jsx?no-check&pin=v57";
import "prismjs/components/prism-typescript?no-check&pin=v57";
import "prismjs/components/prism-tsx?no-check&pin=v57";
import "prismjs/components/prism-bash?no-check&pin=v57";
import "prismjs/components/prism-powershell?no-check&pin=v57";
import "prismjs/components/prism-json?no-check&pin=v57";
import "prismjs/components/prism-diff?no-check&pin=v57";

type DivAttrs = JSX.IntrinsicElements["div"];
interface Props extends DivAttrs {
  body: string;
}

const markdownStyles = css({
  "ul li::marker": {
    content: '"—   "'
  },
  "a:not([href^=\"#\"])": apply`text-gray-900 border-b border-yellow-500 
    hover:border-b-2 hover:no-underline font-semibold
  `,
});

export default function Markdown(props: Props) {
  const html = render(props.body, { allowMath: true, allowIframes: true });

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS + KATEX_CSS }} />
      </Head>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        class={tw(markdownStyles) + " markdown-body"}
        data-color-mode="auto"
      ></div>
    </>
  );
}