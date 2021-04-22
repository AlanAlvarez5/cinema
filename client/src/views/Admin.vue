<template>
    <v-container>
        <v-tabs
            fixed-tabs
            background-color="primary"
            dark
            v-model="tab"
        >
            <v-tab
                v-for="item in tabs"
                :key="item"
            >
            {{item}}
            </v-tab>
        </v-tabs>

        <v-data-table
            :headers="headers"
            :items="elementos"

            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{tabs[tab]}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    
                        <v-btn color="primary" dark class="mb-2">
                            Agregar {{tabs[tab]}}
                        </v-btn>
                
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-btn>
                Editar
            </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    tab: 0,
    tabs: ['Funciones', 'Peliculas', 'Salas', 'Compras'],
    headers: [],
    elementos : []
  }),
  created() {
    if(this.tab == 0){

    } else if (this.tab == 1){

    } else if(this.tab == 2) {
        this.get_salas()

    } else if(this.tab == 3){

    }
  },
  methods: {
      async get_salas(){
          const salas = await this.axios.get('/sala/get-salas');
          this.elementos = salas.data
          this.headers = [
              { text: 'Número de sala', sorteable: true, value: 'id', align: 'center'},
              { text: 'Número de filas', sorteable: true, value: 'n_filas', align: 'center'},
              { text: 'Número de asientos por fila', sorteable: true, value: 'n_asientos', align: 'center'},
              { text: 'Acciones', sorteable: true, value: 'actions', align: 'center'},
          ]
      }
  },
  watch: {
    tab: function (val) {
        if(this.tab == 0){

        } else if (this.tab == 1){

        } else if(this.tab == 2) {
            this.get_salas()

        } else if(this.tab == 3){

        }
    },
  }
  
}
</script>