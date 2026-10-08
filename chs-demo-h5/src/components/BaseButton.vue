<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
    type?: 'primary' | 'default';
  }>(),
  {
    disabled: false,
    loading: false,
    type: 'primary',
  },
);

defineEmits<{ click: [] }>();
</script>

<template>
  <button
    class="base-button"
    :class="`base-button--${type}`"
    :disabled="disabled || loading"
    type="button"
    @click="$emit('click')"
  >
    <slot>{{ loading ? '处理中…' : '确认' }}</slot>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  min-height: var(--control-height, 44px);
  padding: 0 var(--space-md, 16px);
  border: 1px solid var(--color-border, #d9d9d9);
  border-radius: var(--radius-md, 8px);
  background: var(--color-surface, #fff);
  color: var(--color-text, #1f2329);

  &--primary {
    border-color: var(--color-primary, #1677ff);
    background: var(--color-primary, #1677ff);
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
