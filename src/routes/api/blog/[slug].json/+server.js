import { getArticle } from "$lib/helpers/articles";
import { error, json } from "@sveltejs/kit";

export async function GET({ url, params }) {
   const article = getArticle(params.slug);
   if (article) {
      return json(article);
   }
   throw error(500, "Couldn't fetch articles from getArticles()");
}
