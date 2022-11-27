import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";
import toc from "markdown-toc";
import hljs from "highlight.js";

marked.setOptions({
   highlight: function (code, lang, _callback) {
      if (hljs.getLanguage(lang)) {
         return hljs.highlight(code, { language: lang }).value;
      } else {
         return hljs.highlightAuto(code).value;
      }
   }
});

const directory = "blog-articles";
const formatdate = (datestring) => {
   // Given a date in string format return well-formatted date
   const date = new Date(datestring);
   const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
   const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
   const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
   return `${day} ${month} ${year}`;
};

export function getArticles() {
   const slugs = fs
      .readdirSync(directory)
      .filter((file) => path.extname(file) === ".md")
      .map((file) => file.slice(0, -3));

   return slugs
      .map(getMatter)
      .sort((a, b) => {
         // Sort from the most recent
         return a.pubdate < b.pubdate ? 1 : -1;
      })
      .map((article) => {
         article.nicedate = formatdate(article.pubdate);
         return article;
      });
}

function getFileFromSlug(slug) {
   const file = `${directory}/${slug}.md`;
   if (!fs.existsSync(file)) {
      return null;
   }
   return fs.readFileSync(file, "utf-8");
}

function getMatter(slug) {
   const article = getFileFromSlug(slug);
   if (!article) {
      return null;
   }
   return {
      ...matter(article).data,
      path: `/blog/${slug}`
   };
}

export function getArticle(slug) {
   const article = getFileFromSlug(slug);

   const markdown = matter(article);
   const tableofcontent = toc(article).json;
   let frontmatter = markdown.data;
   const html = marked.parse(markdown.content);
   frontmatter.nicedate = formatdate(frontmatter.pubdate);

   return {
      html,
      frontmatter,
      tableofcontent
   };
}
