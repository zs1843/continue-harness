<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' }
});

const open = ref(false);
const scale = ref(1);
const offset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const pointerOrigin = ref({ x: 0, y: 0 });

function reset() {
  scale.value = 1;
  offset.value = { x: 0, y: 0 };
}

function show() {
  reset();
  open.value = true;
  document.body.classList.add('image-viewer-open');
}

function hide() {
  open.value = false;
  dragging.value = false;
  document.body.classList.remove('image-viewer-open');
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) hide();
}

function zoom(delta) {
  scale.value = Math.min(4, Math.max(0.6, Number((scale.value + delta).toFixed(2))));
}

function onWheel(event) {
  event.preventDefault();
  zoom(event.deltaY < 0 ? 0.15 : -0.15);
}

function startDrag(event) {
  if (scale.value <= 1) return;
  dragging.value = true;
  pointerOrigin.value = {
    x: event.clientX - offset.value.x,
    y: event.clientY - offset.value.y
  };
}

function moveDrag(event) {
  if (!dragging.value) return;
  offset.value = {
    x: event.clientX - pointerOrigin.value.x,
    y: event.clientY - pointerOrigin.value.y
  };
}

function endDrag() {
  dragging.value = false;
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('image-viewer-open');
});
</script>

<template>
  <figure class="zoomable-image">
    <button class="zoomable-image-trigger" type="button" :aria-label="`放大查看：${alt}`" @click="show">
      <img :src="src" :alt="alt" />
      <span class="zoomable-image-hint">点击放大</span>
    </button>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>

  <Teleport to="body">
    <div
      v-if="open"
      class="image-viewer"
      role="dialog"
      aria-modal="true"
      :aria-label="alt"
      @click.self="hide"
      @wheel="onWheel"
    >
      <div class="image-viewer-toolbar">
        <span>{{ Math.round(scale * 100) }}%</span>
        <button type="button" title="缩小" aria-label="缩小" @click="zoom(-0.2)">−</button>
        <button type="button" title="放大" aria-label="放大" @click="zoom(0.2)">+</button>
        <button type="button" title="重置" aria-label="重置" @click="reset">重置</button>
        <button type="button" title="关闭" aria-label="关闭" @click="hide">×</button>
      </div>
      <div
        class="image-viewer-stage"
        :class="{ dragging }"
        @pointerdown="startDrag"
        @pointermove="moveDrag"
        @pointerup="endDrag"
        @pointercancel="endDrag"
        @pointerleave="endDrag"
        @dblclick="reset"
      >
        <img
          :src="props.src"
          :alt="props.alt"
          :style="{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }"
          draggable="false"
        />
      </div>
    </div>
  </Teleport>
</template>
