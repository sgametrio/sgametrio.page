<script>
   import Currently from "$lib/components/currently.svelte";
</script>

<svelte:head>
   <title>@sgametrio</title>
</svelte:head>

<div class="space-y-6 text-lg lg:mx-32 lg:px-8">
   <div class="flex flex-col w-full">
      <Currently />
   </div>
   <section>
      <h2 class="mb-1 text-xl font-semibold md:text-2xl">Education</h2>
      <div class="font-light leading-normal">
         <p>
            I graduated in MSc. in Informatics by attending a <span class="italic"
               >double degree</span
            >
            program between UniMiB (Milano) and USI (Lugano) in 2020. The Master's thesis work is a ML
            approach towards Computational Biology methods:
            <a class="font-semibold text-black hover:underline" href="documents/master-thesis.pdf"
               >Free-energy calculations using Graph Convolutional Networks</a
            >.
         </p>
         I pursued BSc. in Informatics degree @ UniMiB in 2018 working on a Natural Language Processing
         thesis:
         <a class="font-semibold text-black hover:underline" href="documents/bachelor-thesis.pdf"
            >Graph-based word sense disambiguation</a
         >.
      </div>
   </section>
   <section>
      <h2 class="mb-1 text-xl font-semibold md:text-2xl">Professional experiences</h2>
      <div class="font-light leading-normal">
         <p>
            I attented <a
               class="font-semibold text-black hover:underline"
               href="https://summerofcode.withgoogle.com/">GSoC</a
            >
            program in 2018 as Web Developer working for
            <a class="font-semibold text-black hover:underline" href="https://it.wikitolearn.org"
               >WikiToLearn 2.0</a
            >
            using technlogies like VueJS and Webpack.
         </p>
         <p>
            I worked in the free time, while attending university, as a web developer using <a
               class="font-semibold text-black hover:underline"
               href="https://laravel.com">Laravel</a
            >
            and
            <a class="font-semibold text-black hover:underline" href="https://vuejs.org">Vue</a>.
         </p>
         <p>Now I'm working @ OperCredits (Zurich) as a DevOps Engineer.</p>
      </div>
   </section>
   <section>
      <h2 class="mb-1 text-xl font-semibold md:text-2xl">Contact me</h2>
      <div class="font-light leading-normal">
         <p>
            If you have any questions regarding some of my GitHub projects, WikiToLearn or about web
            design/development in general feel free to contact me.
         </p>
         <div class="flex justify-center mt-2 md:justify-end">
            <button
               onclick="location.href='mailto:carrarademetrio@gmail.com'"
               class="px-4 py-2 text-sm font-semibold text-black transition-all duration-100 bg-transparent border rounded-full hover:bg-gradient hover:text-white hover:border-transparent"
               >Throw me an email</button
            >
         </div>
      </div>
   </section>
</div>
