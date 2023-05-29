---
title: This Blog
date: 2023-05-29T14:22:31Z
author: Bing Compose
---

In this blog post, I will show you how to create a basic blog website using Deno
runtime, Fresh web framework and Twind for styling. I will also explain how to
host it on Deno Deploy, a serverless platform for Deno applications. The blog
posts will be stored as markdown files in the posts directory, and the
posts/[slug] pages will be pre generated or server side rendered.

## Step 1: Install Deno and Fresh

Deno is a secure and modern JavaScript and TypeScript runtime that supports
native ES modules and built-in tools. Fresh is a web framework for Deno that
provides features such as file-based routing, middleware, hooks, code splitting
and more. To install Deno, follow the instructions on
[https://deno.land/#installation](https://deno.land/#installation). To install
Fresh, run the following command:

```bash
deno install --allow-read --allow-write --allow-net --allow-run --unstable
-n fresh https://deno.land/x/fresh/cli.ts
```

This will install the fresh command-line tool that we will use to create and run
our project.

## Step 2: Create a new project with Fresh

To create a new project with Fresh, run the following command:

```bash
fresh init my-blog
```

This will create a new directory called my-blog with the following structure:

```text
my-blog
├── app.tsx
├─┬ components
│ └── Layout.tsx
├─┬ pages
│ ├── _error.tsx
│ ├── index.tsx
│ ├── posts
│ └── [slug].tsx
├─┬ posts
│ └── hello-world.md
├── styles
└── global.css
```

The app.tsx file is the entry point of our application. It imports the Fresh
module and exports a function that returns the App component. The App component
renders the Layout component, which wraps the page component based on the
current route. The pages directory contains the page components that correspond
to different routes. The _error.tsx file is a special page component that
renders when an error occurs. The index.tsx file is the page component for the
root route (/). The posts/[slug].tsx file is the page component for the dynamic
route (/posts/:slug), where :slug is a parameter that matches the name of a
markdown file in the posts directory. The posts directory contains the markdown
files that store the content of our blog posts. The styles directory contains
the global CSS file that we can use to style our application.

## Step 3: Install Twind and configure it

Twind is a library that allows us to use Tailwind CSS syntax in JavaScript
without any build step or configuration. It also supports features such as dark
mode, variants, plugins and more. To install Twind, run the following command:

```bash
deno cache --unstable --reload https://cdn.skypack.dev/twind/shim
```

This will download and cache the Twind module from Skypack, a CDN for ES
modules. To configure Twind, we need to create a twind.config.ts file in the
root of our project with the following content:

```ts
import { setup } from "https://cdn.skypack.dev/twind/shim";

setup({
  // Add your custom configuration here
});
```

This will import the setup function from Twind and call it with an optional
configuration object. We can use this object to customize various aspects of
Twind, such as theme, plugins, variants and more. For example, we can add a
custom color palette to our theme like this:

```ts
setup({
  theme: {
    extend: {
      colors: {
        primary: "#61dafb",
        secondary: "#282c34",
      },
    },
  },
});
```

For more details on how to configure Twind, refer to
[https://twind.dev/docs/handbook/configuration.html](https://twind.dev/docs/handbook/configuration.html).

## Step 4: Style our application with Twind

To style our application with Twind, we need to import the tw function from
Twind and use it to generate class names based on Tailwind CSS syntax. For
example, we can style our Layout component like this:

```tsx
import { tw } from "https://cdn.skypack.dev/twind";
import type { Component } from "https://deno.land/x/fresh/mod.ts";

const Layout: Component = ({ children }) => {
  return (
    <div className={tw`flex flex-col min-h-screen bg-secondary text-white`}>
      <header className={tw`p-4 bg-primary`}>
        <h1 className={tw`text-4xl font-bold`}>My Blog</h1>
      </header>
      <main className={tw`flex-1 p-4`}>{children}</main>
      <footer className={tw`p-4 bg-primary`}>
        <p className={tw`text-center`}>Powered by Deno, Fresh and Twind</p>
      </footer>
    </div>
  );
};

export default Layout;
```

We can also use Twind directives to apply styles conditionally or responsively.
For example, we can style our index page component like this:

```tsx
import { tw } from "https://cdn.skypack.dev/twind";
import type { Component } from "https://deno.land/x/fresh/mod.ts";
import { getStaticProps } from "./index.tsx";

const Index: Component<{ posts: string[] }> = ({ posts }) => {
  return (
    <div className={tw`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
      {posts.map((post) => (
        <a
          key={post}
          href={`/posts/${post}`}
          className={tw`block p-4 border border-white rounded hover:bg-gray-800`}
        >
          <h2 className={tw`text-2xl font-bold`}>{post}</h2>
        </a>
      ))}
    </div>
  );
};

export { getStaticProps };

export default Index;
```

For more details on how to use Twind, refer to
[https://twind.dev/docs/handbook/getting-started.html](https://twind.dev/docs/handbook/getting-started.html).

## Step 5: Fetch and render blog posts

To fetch and render blog posts, we need to use some Fresh features such as
getStaticProps, getStaticPaths and getServerSideProps. These are special
functions that we can export from our page components to fetch data at build
time or request time.

The getStaticProps function allows us to fetch data at build time and pass it as
props to our page component. This is useful for data that does not change
frequently or can be cached. For example, we can use getStaticProps in our index
page component to fetch the list of blog posts from the posts directory like
this:

```ts
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import type { GetStaticPropsContext } from "https://deno.land/x/fresh/mod.ts";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const postsDir = `${Deno.cwd()}/posts`;
  const posts = existsSync(postsDir)
    ? Deno.readDirSync(postsDir)
      .filter((entry) => entry.isFile && entry.name.endsWith(".md"))
      .map((entry) => entry.name.replace(".md", ""))
    : [];
  return {
    props: {
      posts,
    },
  };
};
```

The getStaticPaths function allows us to specify which paths should be pre
generated at build time for dynamic routes. This is useful for data that can be
known ahead of time or has a finite set of values. For example, we can use
getStaticPaths in our posts/[slug] page component to pre generate all the blog
post pages based on the files in the posts directory like this:

```ts
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import type { GetStaticPathsContext } from "https://deno.land/x/fresh/mod.ts";

export const getStaticPaths = async (context: GetStaticPathsContext) => {
  const postsDir = `${Deno.cwd()}/posts`;
  const paths = existsSync(postsDir)
    ? Deno.readDirSync(postsDir)
      .filter((entry) => entry.isFile && entry.name.endsWith(".md"))
      .map((entry) => `/posts/${entry.name.replace(".md", "")}`)
    : [];
  return {
    paths,
    fallback: false,
  };
};
```

The fallback option determines what happens when a request is made for a path
that is not pre generated. If it is false, then a 404 page will be rendered. If
it is true, then Fresh will try to render the page on demand using
getServerSideProps or fallback rendering.

The getServerSideProps function allows us to fetch data at request time and pass
it as props to our page component. This is useful for data that changes
frequently or depends on user input or session state. For example, we can use
getServerSideProps in our posts/[slug] page component to fetch the content of a
blog post based on the slug parameter like this:

```ts
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import type { GetServerSidePropsContext } from "https://deno.land/x/fresh/mod.ts";

export const getServerSideProps = async (
context: GetServerSidePropsContext<{ slug: string }>
) => {
const slug = context.params
```
