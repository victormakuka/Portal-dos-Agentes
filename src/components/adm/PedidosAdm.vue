<template>
    <div class="h-screen w-screen">
     <!-- Div do header-laranja -->
    <div class="h-30 w-full bg-orange-500  fixed">
        <!-- Botão de voltar -->
       <div class="text-xl font-bold px-3 py-2 flex flex-row text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mt-1.5"> 
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Pedidos
       </div>

       <!-- Descrição do header -->
        <div class="px-12">
        <div class="text-sm text-white whitespace-nowrap">
           Responda apenas com um click todas as 
           <div class="text-sm text-white whitespace-nowrap">
            solicitações dos seus subagentes
        </div>
        </div>
       </div>
    </div>
    <main class="fixed py-8">
        <Menu/>
    </main>
    
      <div class=" text-orange-500 flex items-center justify-center h-full p-2 flex  flex-col w-full ">
        <div class="flex items-start justify-start text-xl w-full">
            Pedidos
        </div>
    <div>
        <div class="max-h-[400px] overflow-y-auto">
        <table class=" table-auto ">
            <tbody>
                <tr 
                    v-for="(pedido, index) in pedidos"
                    :key="pedido.id"
                    :class="['cursor-pointer hover:opacity-80 ', 
                    index % 2 === 0 ? ' text-orange-500' : 'text-orange-500']"
                    
                > 
                    
                     <td class=" py-2 text-sm">{{ pedido.pedidoId }}</td>
                     <td class="px-1 whitespace-nowrap ">{{ pedido.userName }}</td>
                     <td class="px-2 whitespace-nowrap">{{ pedido.valorPedido }}</td>
                     <td class="px-2 whitespace-nowrap">{{ String(pedido.dataPedido).replace(/\.\d+Z$/,"") }}</td>
                     <td class="">
                        <button :class="pedido.isAceite ? 'bg-green-700 text-sm text-white px-1 py-1 rounded-md' : 'bg-red-700 text-sm text-white px-1 py-1 rounded-md'">
                              {{ pedido.isAceite ? 'Realizado' : 'Pendente' }}
                        </button>
                    </td>
                  
               
               </tr>
               
                <!-- <td class="px-2">2123</td>
                    <td class="px-2">Victor Makuka</td>
                    <td class="px-2">12.000kz</td>
                    <td><button class="bg-green-700 text-sm text-white px-1 py-1 rounded-md">Realizado</button></td> -->
            </tbody>
        </table>
    </div> 
    </div>
</div>
</div>
</template>

<script setup>
import Menu from './Menu.vue';
import { ref } from 'vue'
import { get } from '../../../Servicos/GetAllPedidos';
import { onMounted } from 'vue'; 

onMounted(async () => {
      const response = await get();
      console.log(response);
      pedidos.value = response;
});

const pedidos = ref([ 
        {
          id: 234,
          nome: "Kennedy Victor",
          valor: 120000,
       
        },
        {
          id: 235,
          nome: "Silva André",
          valor: 120000,
        
        },
        {
          id: 235,
          nome: "Victor Makuka",
          valor: 40000,
        },
        {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
    {
          id: 235,
          nome: "Edvaldo João",
          valor: 30000,
    },
        
 ]
 )
 
</script>