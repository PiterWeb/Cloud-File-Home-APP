<script>

  import { Share } from '@capacitor/share';

  import { params , goto } from "@roxi/routify";

  var fileName = $params.file;

  import { ip , port } from '../../store/stores';

  var url = "http://" + $ip + ":" + $port + "/api/file/" + fileName;

  const fetchFiles = (async () => {
    const response = await fetch(url);
    return await response.json();
  })();

  const shareFile = (async () => {

   await Share.share({
    title: fileName,
    url: url + '/download',
    dialogTitle: 'Share files in your local network',
    });

  });

  const deleteFile = (async () => {
    
    const response = await fetch(url + '/delete', {
      method: 'POST',
    });

    const data = await response.json();

    if (data.status === 200) {
      return $goto('/files');
    }

  });

</script>

<div class="container">

<div class="tile is-vertical is-danger notification" style="border-radius:0px">

  <nav class="level">

    <div class="level-left">

      <p class="title level-item" style="text-align:center;">File</p>

    </div>

    <div class="level-right">
          <a href="/files/" class="level-item" style="text-decoration:none;"><button class="button is-black">Go Back</button></a>
    </div>

  </nav>

{#await fetchFiles}
  <p>...waiting</p>
{:then data}
  <div class="columns is-multiline">
      <div class="column is-narrow block">
        <p class="title is-5">{data.fileName}</p>

        {#if data.content}

          <p class="title is-6">Text Content: {data.content}</p>

        {/if}

        {#if data.imgsrc}

        <figure class="image is-fullwidth">
          
          <img alt={data.fileName} src={data.imgsrc} />

        </figure>

        {/if}

        {#if data.audiosrc}

        <audio controls>

          <source src={data.audiosrc} type="audio/mpeg">

            The app does not support this audio

        </audio>

        {/if}

        {#if data.videosrc}
          
        <video controls width="320" height="240">

          <track kind="captions">

          <source src={data.videosrc} type="video/mp4">
        
          The app does not support this video
        
        </video>

        {/if}

        <a target="_blank"  href={url + '/download'} style="text-decoration:none;"><button class="button is-black" style="margin-top:5%">Download</button></a>

        <button style="margin-top:5%" class="button is-black" on:click={shareFile}>Share</button>

        <button style="margin-top:5%" class="button is-black" on:click={deleteFile}>Delete</button>
        
      </div>
  </div>
{:catch error}
  <p>An error occurred! : {error}</p>
{/await}

</div>

</div>

<style>

</style>
