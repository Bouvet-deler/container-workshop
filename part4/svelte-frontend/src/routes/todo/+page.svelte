<script lang="ts">
  import { enhance } from '$app/forms';
  import type { LoadReturnType } from './+page.server';

  export let data: LoadReturnType;
</script>

<h1>Todo</h1>

<!-- For debugging purposes -->
<pre>{JSON.stringify(data, null, 2)}</pre>

<ul>
  {#each data.data ?? [] as { id, message, completed }}
    <form method="post" action="?/toggleItemCompletionState" use:enhance>
      <input type="hidden" name="id" value={id} />
      <li>
        {message} |
        <button>
          {completed ? 'Completed' : 'Not completed'}
        </button>
      </li>
    </form>
  {/each}
</ul>

<form action="?/createNewTodo" method="post" use:enhance>
  <!-- svelte-ignore a11y-autofocus -->
  <input autofocus type="text" name="item" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
