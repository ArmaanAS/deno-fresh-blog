import { extract } from "$std/front_matter/yaml.ts";

export interface Post {
  id: string;
  title: string;
  date: Date;
  author: string;
  // description: string;
  // tags: string[];
  // image: string;
  // slug: string;
  body: string;
}

// Posts directory
const postsDir = `${Deno.cwd()}/posts`;

/**
 * Read a post from the posts directory.
 * 
 * @param id The post filename
 * 
 * @returns The post with parsed markdown
 */
function readPost(id: string): Post {
  const text = Deno.readTextFileSync(`${postsDir}/${id}.md`);

  const data = extract(text);

  if (!data.attrs.title) throw new Error(`Post ${id} is missing a title`);
  if (!data.attrs.date) throw new Error(`Post ${id} is missing a date`);
  if (!data.attrs.author) throw new Error(`Post ${id} is missing an author`);

  const date = new Date(data.attrs.date.toString());

  return {
    id: id,
    title: data.attrs.title ? data.attrs.title.toString() : "Placeholder title",
    date: date,
    author: data.attrs.author ? data.attrs.author.toString() : "Placeholder author",
    body: data.body,
  };
}

// Start timing load time
const loadStart = performance.now();

// Find all blog posts in the posts directory
export const posts: Post[] = [...Deno.readDirSync(postsDir)]
  .filter((post) => post.isFile && post.name.endsWith(".md"))
  .map((post) => readPost(post.name.slice(0, -3)))
  .sort((a, b) => b.date.getTime() - a.date.getTime());

const postsMap = new Map<string, Post>();

for (const post of posts) {
  postsMap.set(post.id, post);
}

// End timing load time
const elapsed = performance.now() - loadStart;
console.log(`Loaded ${posts.length} post(s) in ${elapsed.toPrecision(3)}ms`);

/**
 * Get a post by id.
 * 
 * @param id Post id
 * @returns The post with the given id or undefined
 */
export function getPost(id: string): Post | undefined {
  return postsMap.get(`${id}`);
}


/**
 * Get (upto) the given number of the latest posts.
 * 
 * @param numPosts Number of posts to get
 * @returns A given number of newest posts
 */
export function getNewPosts(numPosts?: number): Post[] {
  return posts.slice(0, numPosts);
}