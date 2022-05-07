<template>
  <v-container>
    <v-card>
      <v-card-title class="font-weight-regular">{{ title }}
        <v-spacer></v-spacer>
        <!--      <v-icon-->
        <!--          class="ml-4" @click="refreshItem">-->
        <!--        mdi-refresh-->
        <!--      </v-icon>-->
      </v-card-title>
      <v-form ref="form"
              v-model="valid"
              lazy-validation>
        <v-card-text>
          <v-text-field
              v-model="formItem.title"
              :disabled="readonly"
              :loading="loading"
              :readonly="readonly"
              label="Name">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="this.back">
            Zurück
          </v-btn>
          <!--        <v-btn v-if="!readonly"-->
          <!--               :disabled="!valid"-->
          <!--               color="primary"-->
          <!--               text @click="validate">-->
          <!--          Speichern-->
          <!--        </v-btn>-->
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import validations from "@/utils/validations";

export default {
  data() {
    return {
      valid: true,
      ...validations,
    }
  },
  props: {
    title: null,
    loading: null,
    updateItem: null,
    refreshItem: null,
    deleteItem: null,
    readonly: null,
    value: null,
  },
  computed: {
    formItem: {
      get() {
        return this.value;
      }, set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    // validate() {
    //   if (this.$refs.form.validate()) {
    //     this.updateItem()
    //   }
    // },
    back() {
      this.$router.back();
    }
  }
}
</script>