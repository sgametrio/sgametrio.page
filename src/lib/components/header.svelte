<script>
   import { page } from "$app/stores";

   let routes = [
      { text: "Projects", to: "/projects" },
      { text: "Blog", to: "/blog" },
      { text: "Thesis", to: "/thesis" },
      { text: "CV", to: "/documents/curriculum-vitae.pdf" }
   ];

   $: segment = $page.url.pathname;
</script>

<header
   class="flex items-start sm:items-center container mx-auto pt-4 md:pt-8 lg:pt-16 {$$props.class ||
      ''}"
>
   <div class="flex-none mr-4 lg:mr-8">
      <a href="/">
         <img
            alt="Profile"
            href="/"
            class="w-16 h-16 rounded-full lg:h-32 lg:w-32 -rotate-12"
            src="/images/profile-sunnio-square-small.jpg"
         />
      </a>
   </div>

   <div class="xl:-mt-3">
      <h1
         class="flex-grow mb-2 text-xl font-semibold text-white md:text-3xl lg:text-4xl xl:text-5xl"
      >
         <div class="hidden md:inline">Demetrio Carrara</div>
         <span
            class="md:bg-black font-normal md:ml-2 rounded-full font-fira md:text-white text-md md:p-2 md:px-3 md:text-xl lg:text-2xl align-middle"
         >
            <a href="https://github.com/sgametrio">
               <img
                  class="hidden md:inline h-5 w-5 lg:h-6 lg:w-6 my-auto"
                  src="/images/vendor/github-icon-light.png"
                  alt=""
               />
               @sgametrio
            </a>
         </span>
      </h1>

      <nav class="mb-2 lg:mt-2">
         <ul class="flex flex-wrap list-reset space-x-2">
            {#each routes as route}
               <li class="text-center w-20">
                  <a
                     class="{segment.substring(0, route.to.length) === route.to
                        ? 'bg-gradient text-white'
                        : 'bg-white text-black'} py-1 block px-2 md:py-2 md:px-3 shadow-md rounded-full hover:bg-gradient hover:text-white hover:border-transparent font-bold text-sm"
                     href={route.to}
                     data-sveltekit-prefetch>{route.text}</a
                  >
               </li>
            {/each}
         </ul>
      </nav>
   </div>
</header>
