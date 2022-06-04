<template>
  <div>
    <h1 class="text-center h-1">LISTA PARA EL SUPERMERCADO</h1>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field required label="Producto" v-model="lista.producto" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field required label="Cantidad" v-model="lista.cantidad" />
          </v-col>
        </v-row>
        <v-btn block color="deep-purple darken-1" dark @click="addListaForm"
          >AGREGAR</v-btn
        >
      </v-container>
    </v-form>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Producto</th>
            <th class="text-left">Cantidad</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listas" :key="item.id">
            <td>{{ item.producto }}</td>
            <td>{{ item.cantidades }}</td>
            <td class="text-center">
              <v-btn
                class="mr-2"
                color="error"
                @click="deleteListaItems(item.id)"
                >Eliminar</v-btn
              >
              <v-btn color="amber darken-2" dark @click="activarUpdate(item)"
                >Editar</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Editar </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Producto"
                    v-model="lista.producto"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Cantidad"
                    v-model="lista.cantidades"
                  />
                </v-col>
              </v-row>
              <v-btn
                block
                color="amber darken-2"
                dark
                @click="updateListaForm"
                >Editar</v-btn
              >
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      lista: {
        producto: "",
        cantidades: "",
      },
      dialog: false,
    };
  },
  methods: {
    ...mapActions([
      "add_lista",
      "delete_lista",
      "update_lista",
      "get_listas",
    ]),
    addListaForm() {
      this.add_lista({ ...this.lista });
      this.lista = {};
    },
    deleteListaItems(id) {
      this.delete_lista(id);
    },
    activarUpdate(item) {
      this.dialog = true;
      this.lista = item;
    },
    updateListaForm() {
      this.update_lista({ ...this.lista });
      this.lista = {};
      this.dialog = false;
    },
  },
  computed: {
    ...mapState(["listas"]),
  },
  created() {
    this.get_listas();
  },
};
</script>
<style>
.h-1 {
  color: #5e35b1;
}
</style>