<template>
  <div class=" h-screen w-screen ">
    <!-- Div do header-laranja -->
    <div class="w-full h-30 fixed bg-orange-500 ">

      <!-- Botão de voltar -->
      <div class="text-xl font-bold px-3 py-2 flex flex-row text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-5 mt-1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Agentes
      </div>
      <!-- Descrição do header -->
      <div class="px-17">
        <div class="text-sm  whitespace-nowrap text-white">
          Faça a gestão dos seus Subagentes editando
        </div>
        <div class="text-sm text-gray-600 whitespace-nowrap text-white">e alterando os dados dos seus Subagentes.
        </div>
      </div>
    </div>

    <div class="py-8 top-6 left-0 z-10">
      <Menu />
    </div>
    <div class="flex items-center justify-center pt-24"> 
      <div class="whitespace-nowrap ">
        <div class="flex flex-row items-center justify-center bg-gray-300 h-full w-full space-x-2 py-8 px-3 rounded-md ">

          <!-- Input de Pesquisar -->
          <div  class="text-sm text-gray-800 rounded-xl bg-white px-4 py-2 flex flex-row items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mt-0.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
             </svg>
            <input 
             type="text" 
             placeholder="Pesquisar usuários..."
             v-model="filtro"
             class="focus:outline-none focus:ring-0  w-full "
             >
             
          </div>
          
          <!-- Botão adicionar novo usuario -->
           
          <div class="text-sm text-white rounded-md bg-blue-600 px-2 py-2 flex flex-row items-center justify-center space-x-2 font-bold">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-white mt-0.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
            <input 
            type="button" 
             value="Usuário"
             @click="Adicionar()"
           >
           
        </div>

        </div>

        <div class="bg-white p-2">
          <table class="table-auto ">
            <thead>
              <tr>
                <div class="flex items-center justify-start space-x-4 py-2">
                <th class="px-25 text-xs">id</th>
                <th class=" text-xs">Nome</th>
              </div>
              </tr>
            </thead>
            <div class="max-h-[400px] overflow-y-auto text-xs">
              <tbody>
                <tr v-for="agente in resultados" :key="agente.id" @click="abrirPerfil(agente)" :class="[
                'cursor-pointer hover:opacity-80 border-b border-orange-100',
                
              ]">
                  <td class="w-7 h-7 rounded-full bg-orange-400 text-white  flex items-center justify-center mt-3 ml-10">{{ getIniciais(agente.nome) }}</td>
                  <td class="px-8 py-4">{{ agente.id }}</td>
                  <td class="px-10">{{ agente.nome }}</td>
                </tr>
              
              </tbody>
            </div>
          </table>

          <!-- <div class="flex items-end justify-end mr-[-3px]">
            <button
              class="text-sm text-gray-200 font-semibold bg-orange-500 hover:bg-orange-400 py-2 px-2 mt-4 flex items-end justify-end rounded-md">
              Ver mais
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                <path fill-rule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div> -->
        </div>
      </div>
    </div>

    
    <main v-if="aparecerPerfil">
      <verPerfil @fechar-perfil="aparecerPerfil = false" :agente="agenteSelecionado" />
    </main>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50" v-if="load">
      <processo v-if="load" />
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import processo from '../processo.vue'
import { ref } from 'vue'
import verPerfil from './verPerfil.vue'
import Menu from './Menu.vue'
import { getAllUsers } from '../../../Servicos/GetAllUsers'
import { onMounted } from 'vue'
import router from '@/router';
const aparecerPerfil = ref(false)
const agenteSelecionado = ref(null)
const filtro = ref('');
const resultados = ref([]);
const agentes = ref([])




// const agentes = ref([
//   {
//     id: 234,
//     nome: "Kennedy João ",
//     numero: 940292710,
//     email: "kennedyjoao123@gmail.com",
//     endereco: "cacuaco"
//   },
//   {
//     id: 235,
//     nome: "Silva Kizenga ",
//     numero: 936421730,
//     email: "silvaandre123@gmail.com",
//     endereco: "Cacuaco"
//   },
//   {
//     id: 235,
//     nome: "Victor Makuka",
//     numero: 939399825,
//     email: "victormakuka1@gmail.com",
//     endereco: "Cacuaco"
//   },
//   {
//     id: 235,
//     nome: "Edvaldo Dantas",
//     numero: 936008338,
//     email: "edvaldojoao123@gmail.com",
//     endereco: "Viana"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },
//   {
//     id: 123,
//     nome: "Abraão Eduardo",
//     numero: 941036220,
//     email: "abraaoeduardo123@gmail.com",
//     endereco: "Zango 3mil"
//   },



// ])


let load = ref(false)
onMounted(async() => {
  load.value = true
  await getAllUsers()
  agentes.value = await getAllUsers()
  resultados.value = agentes.value; // ← Mostra todos inicialmente
  load.value = false
})

function abrirPerfil(agente) {
  agenteSelecionado.value = agente
  aparecerPerfil.value = true
}

function getIniciais(nome) {
  const partes = nome.trim().split(" ");
  return partes[0][0] + (partes[1]?.[0] || '');
}

// Filtro de agentes
let timeout = null;

watch(filtro, (novoValor) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const texto = novoValor.toLowerCase();
    resultados.value = agentes.value.filter(agente =>
      agente.nome.toLowerCase().includes(texto) ||
      agente.email.toLowerCase().includes(texto) ||
      agente.id.toString().includes(texto)
    );
  }, 300); // 300ms de atraso
}, { immediate: true });


// Adicionar
function Adicionar() {
  router.push('/adicionarAgentes')
}

</script>
