<script>

    import { ip , port } from '../store/stores';
    import { goto } from '@roxi/routify'

    let newPort;
    let newIP;

    const connect = () => {

        ip.set(newIP);
        port.set(newPort);

        $goto('./files')

    }



</script>

    <div class="container">

        <div class="tile is-vertical is-danger notification" style="border-radius:0px">
            <p class="title" style="text-align:center;">File Home Cloud</p>
    
        </div>

    <div class="box">

        <p class="title is-4">Server IP</p>

        <input type="text" class="input" placeholder="Ex: 192.168.1.XX" bind:value={newIP}>

        <p class="title is-4">Server Port</p>

        <input type="text" class="input" placeholder="Ex: 5000" bind:value={newPort}>

        <button style="margin-top:5%" class="button is-black" on:click={connect}>Connect</button>

    </div>

    </div>  

<style>

</style>