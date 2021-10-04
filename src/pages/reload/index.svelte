<script>
    import { goto , params } from "@roxi/routify";

    if ($params.url) $goto($params.url)
    else $goto('/')

</script>