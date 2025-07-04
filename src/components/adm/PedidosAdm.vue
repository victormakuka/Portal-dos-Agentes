<template>
  <div class="min-h-screen w-screen ">
    <!-- Header fixo -->
<header class="bg-orange-500 text-white px-4 py-4 fixed top-0 w-full z-10 shadow-md flex flex-col">
  <!-- Linha com menu e título -->
  <div class="flex items-center space-x-2 text-xl font-semibold">
    <!-- Botão hamburguer dentro da div (mantida) -->
    
    <!-- Título -->
  </div>

  <!-- Descrição abaixo -->
  <p class="text-sm pl-1 mt-1"
  style="margin-left: 25px; ">Responda com um clique todas as solicitações dos seus subagentes</p>
</header>
    <div class="fixed py-2 top-2 left-0 z-10">
      <Menu />
    </div>


    <!-- Espaço após header -->
    <main class="pt-24 px-4 pb-16">
      <!-- Componente de menu (reposicionado corretamente) -->

      <!-- Lista de pedidos -->
       <div class="flex items-center justify-center  w-full">
      <div class="space-y-4 w-full">
        <h2 class="text-xl font-bold text-orange-600 mb-2">Lista de Pedidos</h2>
        
       <div class="flex felx-row space-x-4">

        <button
          @click="statusSelecionado = ''"
          :class="statusSelecionado === '' ? 'bg-gray-700' : 'bg-gray-500'"
          class="text-xs px-2 py-1.5 border border-white rounded-xl text-white">
           Todos
         </button>



          <!--Filtro por Realizados! -->
          <button  @click="statusSelecionado = true"
          :class="statusSelecionado === true ? 'bg-green-700' : 'bg-green-600'"
          class="text-xs px-2 py-1.5 border border-white rounded-xl bg-green-600 text-white">
            Realizado
          </button>

          <!-- Filtor por Pendente -->
          <button  @click="statusSelecionado = false"
            :class="statusSelecionado === false ? 'bg-red-700' : 'bg-red-600'"
            class="text-xs px-2 py-1.5 border border-white rounded-xl bg-red-500 text-white">
            Pendente
          </button>

        </div>
         <!-- Input de Pesquisar -->
         <div  class="text-sm text-gray-800 rounded-xl bg-white px-4 py-2 flex flex-row items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mt-0.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
             </svg>
            <input 
             type="text" 
             placeholder="Pesquisar pedidos..."
             v-model="filtro"
             class="focus:outline-none focus:ring-0  w-full "
             >      
          </div>

        <div class="space-y-3 max-h-[550px] overflow-y-auto pr-1">
          <div
            v-for="pedido  in resultados"
            :key="pedido.id"
            class="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center hover:shadow-md transition duration-200 border border-orange-100"
          >
            <div>
              <p class="text-sm text-gray-700 font-semibold">{{ pedido.pedidoId }} - {{ pedido.userName }}</p>
              <p class="text-sm text-gray-500">Valor: {{ pedido.valorPedido }}</p>
              <p class="text-xs text-gray-400">{{ String(pedido.dataPedido).replace(/\.\d+Z$/, "") }}</p>
            </div>

            <button
              @click="Realizar(pedido.pedidoId, pedido.isAceite)"
              :class="pedido.isAceite
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'"
              class="text-white text-sm px-3 py-1 rounded-lg shadow transition"
            >
              {{ pedido.isAceite ? 'Realizado' : 'Pendente' }}
            </button>
          </div>
        </div>
      </div>
      </div>
    </main>

    <!-- Loader -->
    <div v-if="load" class="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
      <processo />
    </div>
  </div>
</template>



<script setup>
import { watch } from 'vue';
import Menu from './Menu.vue';
import { ref } from 'vue'
import { get } from '../../../Servicos/GetAllPedidos';
import { onMounted } from 'vue'; 
import processo from '../processo.vue';
import { putPedido } from '../../../Servicos/putPedido';
import { useRouter } from 'vue-router';
const filtro = ref('');
const resultados = ref([]);

const menuAberto = ref(false)
const router = useRouter();
const pedidos = ref([]);
const load = ref(false);
const statusSelecionado = ref(''); // '' = todos, true = realizado, false = pendente


onMounted(async () => {
      load.value = true;
      const response = await get();
      pedidos.value = response;
      resultados.value = pedidos.value; // ← Mostra todos inicialmente

      load.value = false;
});

const Realizar = async (id, isAceite) => {
  if (isAceite) {
    return;
  }
  const response = await putPedido(id);
  if (response) {
    const pedido = pedidos.value.find(p => p.pedidoId === id);
    pedido.isAceite = true;
  } else {
      alert('Erro ao realizar o pedido. Por favor, tente novamente.');
      console.error('Erro ao realizar o pedido:', response);
      router.push('/');
  }
}

// Filtro de Pedidos

let timeout = null;

watch([filtro, statusSelecionado], () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const texto = filtro.value.toLowerCase();
    resultados.value = pedidos.value.filter(pedido =>
    (pedido.userName.toLowerCase().includes(texto) ||
       pedido.pedidoId.toString().includes(texto)) &&
      (statusSelecionado.value === '' || pedido.isAceite === statusSelecionado.value)
    );
  }, 300);
}, { immediate: true });

</script>