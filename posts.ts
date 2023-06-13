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
  cover?: string;
  views: number;
}

// Posts directory
const postsDir = `${Deno.cwd()}/posts`;


// Open the default database for the script.
export const kv = await Deno.openKv();


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


// Initialize the views for each post.
for (const { id } of posts) {
  const key = ["views", id];
  // const res = await kv.get(key);

  // if (res.value === null) {
  //   await kv.set(key, 0);
  // }
  kv.get(key).then((res) => {
    if (!res.value) kv.set(key, new Deno.KvU64(0n));
  });
}


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
    cover: data.attrs.cover ? data.attrs.cover.toString() : undefined,
    views: -1
  };
}

/**
 * Get a post by id and increment views.
 * 
 * @param id Post id
 * @returns The post with the given id or undefined
 */
export async function getPost(id: string, increment = true): Promise<Post | undefined> {
  const post = postsMap.get(`${id}`);

  if (post && increment) {
    post.views = await incrementViews(id);
  }

  return post;
}


/**
 * Get (upto) the given number of the latest posts, with updated view count.
 * 
 * @param numPosts Number of posts to get
 * @returns A given number of newest posts
 */
export async function getNewPosts(numPosts?: number): Promise<Post[]> {
  const newPosts = posts.slice(0, numPosts);

  await Promise.all(
    newPosts.map(async (post) =>
      post.views = await getViews(post.id)
    )
  );

  return newPosts;
}


/**
 * Get (upto) the given number of the latest posts.
 * 
 * **Note: This does not update the view count.**
 * 
 * @param numPosts Number of posts to get
 * @returns A given number of newest posts
 */
export function getNewPostsWithoutViews(numPosts?: number): Post[] {
  return posts.slice(0, numPosts);
}


/**
 * Get the view count for the given post.
 * 
 * @param id Post id
 * @returns View count
 */
export async function getViews(id: string): Promise<number> {
  const res = await kv.get(["views", id]);

  return Number(res?.value as Deno.KvU64);
}

/**
 * Increment the view count for the given post and return the new count.
 * 
 * @param id Post id
 * @return New view count
 */
export async function incrementViews(id: string): Promise<number> {
  await kv.atomic()
    .mutate({
      key: ["views", id],
      value: new Deno.KvU64(1n),
      type: "sum"
    })
    .commit();

  return getViews(id);
}