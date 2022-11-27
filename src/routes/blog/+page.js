import { error } from "@sveltejs/kit";

export async function load({ fetch }) {
   const res = await fetch("/api/blog/list.json");

   if (res.status === 200) {
      const articles = await res.json();
      return { articles };
   }

   throw error(res.status, "Couldn't fetch /api/blog/list.json");
}
