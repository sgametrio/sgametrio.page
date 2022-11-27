<script>
   import { onMount } from "svelte";
   import { page } from "$app/stores";

   export let data;
   let article = data.article;
   let slug = data.slug;

   let firstTimeIntersected = true;
   let currenthash;
   // let basetoclvl = 3 TODO

   // Automatically detect the heading#anchor_name that is on the first half of the viewport
   // By updating the url hash accordingly, we can highlight the table of content respective item
   onMount(async () => {
      const options = {
         root: null,
         rootMargin: "0px 0px -70% 0px",
         threshold: 1.0
      };
      const callback = (changes, observer) => {
         if (firstTimeIntersected) {
            // Avoid the first page load
            firstTimeIntersected = false;
            return;
         }
         for (let change of changes) {
            const target = change.target;
            if (target.nodeName === "H2") {
               // Remove hash for the title
               window.history.replaceState(null, null, `/blog/${slug}`);
               currenthash = "";
            } else if (target.id && change.isIntersecting) {
               window.history.replaceState(null, null, `/blog/${slug}#${target.id}`);
               currenthash = target.id;
            }
         }
      };
      const observer = new IntersectionObserver(callback, options);
      for (let element of document.querySelectorAll("h2, h3, h4, h5, h6")) {
         observer.observe(element);
      }

      currenthash = window.location.hash;
   });
</script>

<svelte:head>
   <title>{article.frontmatter.title} - @sgametrio</title>
   <link href="/highlight-atom-one-dark.css" rel="stylesheet" />
   <meta property="og:type" content="article" />
   <meta property="og:url" content="https://{page.host}{page.path}" />
   <meta property="og:title" content={article.frontmatter.title} />
   <meta property="og:description" content={article.frontmatter.description} />
   <meta property="og:image" content={article.frontmatter.previewurl} />
   <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex my-6 mb-12 text-lg lg:ml-32 lg:pl-8 xl:pl-0 lg:flex-row-reverse max-w-screen">
   <ul class="sticky top-0 hidden w-0 h-0 lg:inline-block lg:h-64 lg:w-72 lg:ml-8 lg:pt-8">
      <h3 class="mb-2 font-semibold">Table of content</h3>
      {#each article.tableofcontent as entry, i}
         <!-- Avoid the first header which is the title of the article -->
         <li
            class="text-sm xl:text-base px-2 py-1 block rounded-lg {currenthash === entry.slug
               ? 'text-blue-600 font-semibold bg-blue-100'
               : 'text-gray-600'}"
         >
            {#if i === 0}
               <a href="/blog/{slug}">{entry.content}</a>
            {:else}
               <a href="/blog/{slug}#{entry.slug}">{entry.content}</a>
            {/if}
         </li>
      {/each}
   </ul>
   <div class="mx-auto">
      <span class="block mb-1 text-sm text-gray-600 lg:text-base xl:text-lg xl:mb-2">
         {article.frontmatter.nicedate} &#8226; Reading time to be added
      </span>
      <article
         class="leading-normal prose-sm prose md:prose lg:prose-lg xl:prose-xl max-w-screen-10 article-reading-time"
      >
         {@html article.html}
      </article>
   </div>
</div>

<style>
   @media (max-width: 767px) {
      .max-w-screen-10 {
         max-width: 90vw;
      }
   }
</style>
