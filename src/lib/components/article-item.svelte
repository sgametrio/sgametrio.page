<script>
   export let article;
   export let index;
</script>

<div
   class="{index % 2 === 0
      ? 'bg-gradient'
      : 'bg-gradient-blue'} pl-1 pt-1 rounded-l-lg rounded-r-xl shadow-lg w-64 h-12 group"
>
   <a href={article.path} data-sveltekit-prefetch class="absolute block">
      <div
         class="flex-col px-6 py-4 shadow group-hover:shadow-md space-y-2 transition-all duration-200 bg-white rounded-lg group-hover:mt-[0.125rem] group-hover:ml-[0.125rem]"
      >
         <h1 class="text-xl font-semibold">{article.title}</h1>
         <span class="text-sm text-gray-600">{article.nicedate}</span>
      </div>
   </a>
</div>
