<script>
   import { goto } from "$app/navigation"
   export let src, title, url, index
</script>

<div
   class="{index % 2 === 0
      ? 'bg-gradient'
      : 'bg-gradient-blue'} pl-2 pt-2 rounded-l-lg rounded-r-xl shadow-lg w-64 h-24 group relative mr-0 -ml-8 md:ml-0 md:mr-16 mb-96 md:mb-0"
>
   <div
      class="absolute box-content flex-col transition-all duration-200 border-gray-100 rounded-lg shadow-md w-80 h-112 border-1 group-hover:shadow-lg group-hover:cursor-pointer"
      on:click={goto(url)}
   >
      <div class="overflow-hidden h-96 w-80">
         <img
            class="transition-all duration-200 transform h-96 w-80 group-hover:scale-105"
            {src}
            alt={title}
         />
      </div>
      <div class="z-10 h-16 px-4 py-1 border-t border-gray-200 w-80">
         <h3 class="font-semibold text-center">{title}</h3>
      </div>
   </div>
</div>
