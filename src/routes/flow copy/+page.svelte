<script lang="ts">
import { writable } from 'svelte/store';
import {
  SvelteFlow,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from '@xyflow/svelte';

import '@xyflow/svelte/dist/style.css'

const nodes = writable([
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Node' },
    position: { x: 0, y: 150 }
  }
]);

const edges = writable([
  {
    id: '1-2',
    type: 'default',
    source: '1',
    target: '2',
    label: 'Edge Text'
  }
]);
</script>

<SvelteFlow
{nodes}
{edges}
fitView
on:nodeclick={(event) => console.log('on node click', event)}
style="width: 100vw; height: 100vh;"
>
<Controls />
<Background variant={BackgroundVariant.Dots} />
<MiniMap />
</SvelteFlow>