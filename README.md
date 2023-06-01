# deno-fresh-blog

A simple blog built with [Fresh](https://deno.land/x/fresh) for
[Deno](https://deno.com/runtime) and [Twind](https://twind.dev/) (Tailwind CSS
framework). Hosted on [Deno Deploy](https://deno.com/deploy).

[![Made with Fresh](https://fresh.deno.dev/fresh-badge.svg)](https://fresh.deno.dev)

## Features

- Simple Markdown renderer for blog post content
- Uses Twind for easy Tailwind configuration
- Customizable with Preact, Fresh and Tailwind
- Server side rendering for fast load times and perfect Lighthouse scores

## Setup

1. Clone this repo on Github
2. Create a [Deno Deploy](https://deno.com/deploy) account
3. Create a new project in Deno Deploy and link that Github repo to it
4. Set the entry file to main.ts

## Local Development

```
deno task start
```

This will run the app on `http://localhost:8000`

## Technologies

- [Fresh Framework](https://deno.land/x/fresh) - Simple Router-based web
  framework built on [Preact](https://preactjs.com)
- [Twind](https://twind.dev/) - Tailwind CSS config for Deno
- [Marky](https://deno.land/x/marky) - Markdown parser
- [Deno Deploy](https://deno.com/deploy) - Serverless hosting

Hope this helps get you started! Let me know if you have any other questions.

## Usage

Once you have deployed the blog, you can access it by visiting the URL provided
by Deno Deploy.

To create new blog posts, simply create a new markdown file in the posts
directory.

The content of the markdown file should be in the following format: Front Matter
(YAML + Markdown)

```markdown
---
title: Title of the Post
author: Your Name
date: YYYY-MM-DDThh:mm:ssZ
---

Content of the post in _Markdown_ format.
```

You can also add images to your blog post by placing them in the public
directory and referencing them in the markdown file.

## License

Deno-Fresh-Blog is licensed under the [MIT License](./LICENSE).
