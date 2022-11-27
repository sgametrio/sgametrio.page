import { getArticles } from "$lib/helpers/articles";
import { error, json } from "@sveltejs/kit";

export async function GET({ url }) {
   const articles = getArticles();
   if (articles) {
      return json(articles);
   }
   throw error(500, "Couldn't fetch articles from getArticles()");
}
