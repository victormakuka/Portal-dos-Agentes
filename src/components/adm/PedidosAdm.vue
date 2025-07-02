<template>
  <div class="min-h-screen w-screen bg-gray-50">
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
      <span style="font-weight: bold; margin-left: 26px; ">Pedidos</span>

      <!-- Lista de pedidos -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-orange-600 mb-2">Lista de Pedidos</h2>

        <div class="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          <div
            v-for="(pedido, index) in pedidos"
            :key="pedido.id"
            class="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center hover:shadow-md transition duration-200 border border-orange-100"
          >
            <div>
              <p class="text-sm text-gray-700 font-semibold">#{{ pedido.pedidoId }} - {{ pedido.userName }}</p>
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
    </main>
j
    <!-- Loader -->
    <div v-if="load" class="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
      <processo />
    </div>
  </div>
</template>



<script setup>
import Menu from './Menu.vue';
import { ref } from 'vue'
import { get } from '../../../Servicos/GetAllPedidos';
import { onMounted } from 'vue'; 
import processo from '../processo.vue';
import { putPedido } from '../../../Servicos/putPedido';
import { useRouter } from 'vue-router';

const menuAberto = ref(false)
const router = useRouter();

const pedidos = ref([]);
const load = ref(false);
onMounted(async () => {
      load.value = true;
      const response = await get();
      pedidos.value = response;
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
</script>