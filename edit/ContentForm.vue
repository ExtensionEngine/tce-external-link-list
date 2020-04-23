<template>
  <div>
    <div :class="{ 'has-error': vErrors.has('title') }">
      <input
        v-model.trim="sectionTitle"
        v-validate="{ required: true, min: 1, max: 500 }"
        class="form-control"
        name="title"
        type="text"
        placeholder="Section title">
      <span v-show="vErrors.has('title')" class="help-block">
        {{ vErrors.first('title') }}
      </span>
    </div>
    <div v-if="hasNoItems" class="message">
      Please add at least one link by clicking on the 'Add new link' button below.
    </div>
    <div v-for="(item, index) in linkItems" :key="index" class="item-row">
      <div
        v-for="propName in ['title', 'url']"
        :key="getName(propName, index)"
        :class="{ 'has-error': vErrors.has(getName(propName, index)) }"
        class="col-xs-5">
        <input
          v-model.trim="item[propName]"
          v-validate="{ required: true, url: propName === 'url', min: 1, max: 500 }"
          :data-vv-as="propName"
          :name="getName(propName, index)"
          :placeholder="capitalize(propName)"
          class="form-control"
          type="text">
        <span v-show="vErrors.has(getName(propName, index))" class="help-block">
          {{ vErrors.first(getName(propName, index)) }}
        </span>
      </div>
      <button
        @click="remove(index)"
        aria-label="Remove item"
        class="btn btn-material-icon btn-remove">
        <span class="mdi mdi-delete"></span>
      </button>
    </div>
    <div class="actions">
      <button @click="add" class="btn">Add new link</button>
      <button
        @click="save"
        :disabled="hasNoItems || !sectionTitle"
        class="btn btn-success">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import capitalize from 'lodash/capitalize';
import cloneDeep from 'lodash/cloneDeep';
import { withValidation } from 'utils/validation';

export default {
  name: 'external-link-list-content-form',
  mixins: [withValidation()],
  props: {
    items: { type: Array, default: () => [] },
    title: { type: String, default: '' }
  },
  data() {
    return {
      linkItems: cloneDeep(this.items),
      sectionTitle: this.title.slice(0)
    };
  },
  computed: {
    hasNoItems() {
      return !this.linkItems.length;
    }
  },
  methods: {
    capitalize,
    add() {
      this.linkItems.push({ title: '', url: '' });
    },
    getName(propName, index) {
      return `${propName}-${index}`;
    },
    remove(index) {
      this.linkItems.splice(index, 1);
    },
    save() {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) return;
        this.$emit('save', { items: this.linkItems, title: this.sectionTitle });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.message, .item-row, .btn-remove {
  padding: 14px;
}

.mdi-delete {
  font-size: 20px;
}

.actions {
  display: flex;
  width: 100%;
  margin-top: 7px;
  padding: 7px;
  justify-content: space-around;
}
</style>
