import Vue from 'vue'
import Vuex from 'vuex'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from '@firebase/firestore';
import { db, auth } from '../firebase';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listas: []
  },
  mutations: {
    ADD_LISTA(state, payload) {
      state.listas.push(payload)
    },
    DELETE_LISTA(state, payload) {
      state.listas = state.listas.filter(
        (item) => item.id !== payload
      );
    },
    UPDATE_LISTA(state, payload) {
      state.listas = state.listas.map(
        (item) =>
          item.id === payload.id
            ? payload
            : item
      );
    },
    GET_LISTAS(state, payload) {
      state.listas = payload;
    },
  },
  actions: {
    async get_listas({ commit }) {
      try {
        const q = query(
          collection(db, "listas"),
          where("uid", "==", auth.currentUser.uid)
        );
        onSnapshot(q, (querySnapshot) => {
          const listas = [];
          querySnapshot.forEach((doc) => {
            listas.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_LISTAS", listas);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async add_lista({ commit }, lista) {
      // dessert.id = nanoid(6)
      try {
        await addDoc(collection(db, "listas",), {
          producto: lista.producto,
          cantidad: lista.cantidad,
          uid: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error)
      }
      // commit('ADD_DESSERT', dessert)
    },
    async delete_lista({ commit }, id) {
      try {
        const docRef = doc(db, "listas", id)
        await deleteDoc(docRef)
      } catch (error) {
        console.log(error)
      }

    },
    async update_lista({ commit }, lista) {
      try {
        const docRef = doc(db, "listas", lista.id);
        await updateDoc(docRef, {
          producto: lista.producto,
          cantidad: lista.cantidad,
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
})
