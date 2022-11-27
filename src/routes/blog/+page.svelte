<!-- Loads data from ./+page.js -->
<script>
   import ArticleItem from "$lib/components/article-item.svelte";

   export let data;
</script>

<svelte:head>
   <title>Blog articles - @sgametrio</title>
</svelte:head>

<div class="mt-6 space-y-6 text-lg lg:mx-32 lg:px-8">
   <h2 class="font-semibold text-black md:text-xl">Blog</h2>
   <ul class="mt-8 space-y-4">
      {#each data.articles as article, i}
         <ArticleItem {article} index={i} />
      {/each}
   </ul>
</div>
