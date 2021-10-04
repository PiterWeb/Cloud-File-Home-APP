<script>
    import { goto , url as urlNow } from '@roxi/routify';

    import { ip , port } from '../../store/stores';

    var url;

    if ($port == null || $port == '') {url = 'http://'+ $ip + '/api/files'}
    else url = 'http://'+ $ip + ':' + $port + '/api/files'

    const fetchFiles = (async () => {
        const response = await fetch(url);
        return await response.json();
    })();

    var files;

    const reload = () => {

      $goto('/reload' , {url : $urlNow()})

    }

    const uploadFile = () => {

      console.log(files[0]);

      if (files[0] && files){

        var formData = new FormData();
        formData.append('myFile', files[0]);

        console.log(formData);

        fetch(url + '/' + files[0].name + '/upload' , {
          method: 'POST',
          body: formData
        }).then(res => res.json()).then((data) => {

          console.log(data.status);

          if (data.status == 200) {

            reload();

          }

        });     

      }

    }

</script>

<div id="main" class="container">

    <div class="tile is-vertical is-danger notification" style="border-radius:0px">
        <p class="title" style="text-align:center;">File Home Cloud</p>

    </div>

    <div class="box">

      <nav class="level">
        <div class="level-left">

        </div>
        <div class="level-right">

          <div class="columns level-item">
            <div class="column">
              <button style="text-align: center;margin-bottom:2%;" on:click={reload} class="button is-black level-item">
                Reload
              </button>
            </div>
            <div class="column">
              <a class="level-item" href="/">
                <button class="button is-black" style="margin-bottom:2%">
                  <span class="icon is-small">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <object type="image/svg+xml" data="./assets/reload-svgrepo-com.svg">
                    </object>
                  </span>&nbsp;&nbsp;
                  Change Server
                </button>
              </a>
            </div>
          </div>

          

            

        </div>
      </nav>
            
        {#await fetchFiles}

            <progress class="progress is-dark" max="100"></progress>

        {:then data}

        <div class="box">

            <div class="file is-danger has-name is-boxed">
                <label class="file-label">
                  <input class="file-input" type="file" bind:files>
                  <span class="file-cta">
                    <span class="file-icon">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <object type="image/svg+xml" data="/assets/cloud-upload-signal-svgrepo-com.svg">
                      </object>
                    </span>
                    <span class="file-label">
                      Select File
                    </span>
                  </span>
                  <span class="file-name">
                    {#if files && files[0]}
                        <p>
                            {files[0].name}
                        </p>
                    {/if}
                  </span>
                </label>
              </div>
    
            <button type="submit" style="margin-top:5%" class="button is-black" on:click={uploadFile}>Upload File</button>
    
        </div>

        <div class="columns is-multiline">

            {#each data as file}

            <div class="column is-narrow">

                <a href="/files/{file}"><span class="tag is-danger" style="font-weight:bold;">{file}</span></a>

            </div>

            {/each}

        </div>

        {:catch error}
            <p class="title is-5">An error occurred during the connection!</p>
        {/await}

    </div>

</div>

<style>
</style>