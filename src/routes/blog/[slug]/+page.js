import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
   const res = await fetch(`/api/blog/${params.slug}.json`);

   if (res.status === 200) {
      const article = await res.json();
      const slug = params.slug;
      return { article, slug };
   }
   throw error(res.status, `/api/blog/${params.slug}.json not found`);
}
