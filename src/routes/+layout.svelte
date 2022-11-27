<script>
   import "../app.css";
   import Header from "$lib/components/header.svelte";
   import Footer from "$lib/components/footer.svelte";
   import { page } from "$app/stores";

   $: segment = $page.url.pathname;
</script>

{#if segment.substring(0, 10) === "/projects/"}
   <!-- Override base layout for custom views -->
   <slot />
{:else}
   <div class="relative min-h-full">
      <div class="absolute top-0 w-full h-32 svg-bg md:h-40 lg:h-64" />

      <div class="flex flex-col min-h-screen mx-4 lg:mx-16 xl:mx-32">
         <Header {segment} />

         <main class="container flex-grow mx-auto">
            <slot />
         </main>

         <Footer />
      </div>

      <div class="absolute bottom-0 w-full h-16 svg-bg-invert lg:h-24" />
   </div>
{/if}

<svg class="block" width="0" height="0">
   <defs>
      <clipPath id="waves" clipPathUnits="objectBoundingBox">
         <path
            transform="scale(0.0125, 0.018)"
            d="M 0,40
          Q 25,25 40,40
          t 40,0
          v -40 
          h -80z"
         />
      </clipPath>
   </defs>
</svg>

<style global>
   .svg-bg {
      z-index: -1;
      background: linear-gradient(
         32deg,
         rgba(9, 41, 121, 1) 0%,
         rgba(7, 67, 150, 1) 32%,
         rgba(0, 159, 255, 1) 100%
      );
      clip-path: url(#waves);
      -webkit-clip-path: url(#waves);
   }

   .svg-bg-invert {
      z-index: -1;
      background: linear-gradient(
         32deg,
         rgba(255, 0, 121, 1) 0%,
         rgba(255, 0, 0, 1) 36%,
         rgba(255, 188, 0, 1) 100%
      );
      clip-path: url(#waves);
      -webkit-clip-path: url(#waves);
      transform: rotate(180deg);
   }
</style>
