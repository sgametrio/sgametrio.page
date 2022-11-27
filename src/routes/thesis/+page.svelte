<script>
  import PdfPreview from "$lib/components/pdf-preview.svelte";
</script>

<svelte:head>
  <title>Thesis folder</title>
</svelte:head>

<div
  class="flex flex-col items-center mt-8 space-y-4 md:mt-16 lg:mx-32 md:flex-row md:space-x-8 md:space-y-0"
>
  <PdfPreview
    src="/images/bachelor-preview.jpg"
    title="Graph-based word sense disambiguation"
    url="/documents/bachelor-thesis.pdf"
    index="0"
  />
  <PdfPreview
    src="/images/master-preview.jpg"
    title="Free-energy calculations using Graph Convolutional Networks"
    url="/documents/master-thesis.pdf"
    index="1"
  />
</div>
