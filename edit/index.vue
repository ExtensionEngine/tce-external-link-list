<template>
  <div class="tce-external-link">
    <div
      v-if="showPlaceholder && !isFocused"
      class="well external-link-list-placeholder">
      <div class="message">
        <span class="heading">External link list placeholder</span>
        Select to edit
      </div>
    </div>
    <content-form
      v-else-if="isFocused"
      @save="$emit('save', $event)"
      :items="items"
      :title="title" />
    <div v-else>
      <div class="preview">
        <div class="title">{{ title }}</div>
        <div v-for="{ id, title: linkTitle, url } in items" :key="id">
          <div class="link-title">{{ linkTitle }}</div>
          <a :href="url" target="_blank">{{ url }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentForm from './ContentForm';
import get from 'lodash/get';
import some from 'lodash/some';

export default {
  name: 'external-link-list',
  props: {
    element: { type: Object, required: true },
    isFocused: { type: Boolean, default: false }
  },
  data() {
    return {
      items: [],
      title: ''
    };
  },
  computed: {
    showPlaceholder() {
      return !this.title && !some(this.items, ({ title, url }) => title || url);
    }
  },
  watch: {
    isFocused: {
      immediate: true,
      handler() {
        this.items = get(this.element, 'data.items', []);
        this.title = get(this.element, 'data.title');
      }
    }
  },
  components: { ContentForm }
};
</script>

<style lang="scss" scoped>
.external-link-list-placeholder {
  .message {
    padding: 15px;

    .heading {
      font-size: 24px;
    }

    span {
      display: block;
      font-size: 18px;
    }
  }
}

.preview {
  padding: 10px 15px;
  text-align: left;
  font-size: 16px;

  .title {
    margin-bottom: 10px;
    font-weight: 400;
  }

  .title, .link-title, a {
    overflow-wrap: break-word;
  }

  a {
    color: #708fbd;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
