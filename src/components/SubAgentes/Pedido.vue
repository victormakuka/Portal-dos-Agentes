<template>
    <div class="m-0 py-4 px-12 border  border-gray-300 shadow-sm w-[395px]"> <div class="text-md font-bold ">Solicitar a Recarga</div> <div class="text-sm text-gray-600">Solicite a sua recargar no seu agente de forma segura  rápida.</div></div>

   

<div class="py-24 px-8">
     
 <div class="text-2xl font-bold flex flex-row items-end ">
     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-orange-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
{{ UserName }}
</div>

  <div class=" mt-8 space-x-2">
    <select name="valor" id="valor" class="border border-orange-600 text-sm text-gray-600 rounded-sm w-[150px] py-2 px-2" v-model="valor">
        <option value="">Selecione o valor</option>
        <option v-for="valor in [10000, 25000, 50000, 100000]" :key="valor" :value="valor">
            {{ valor.toLocaleString('pt-PT', { style: 'currency', currency: 'AOA' }) }}
        </option>
    </select>
    <input 
    type="submit"
    value="Solicitar"
    class="bg-orange-600 text-white text-sm rounded-sm py-2 px-2 w-[100px]"
    @click="FazerPedido"
    >
</div>
</div>

<div class="py-8 px-8">
    <div class="text-2xl font-bold flex flex-row items-end ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-orange-600 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Meus Pedidos
    </div>
    <div class="mt-4">
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-2 py-1 text-left">ID</th>
                    <th class="px-2 py-1 text-left">Valor</th>
                    <th class="px-2 py-1 text-left">Data</th>
                    <th class="px-2 py-1 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pedido, index) in pedidos" :key="pedido.id" :class="[index % 2 === 0 ? 'bg-gray-100' : 'bg-white']">
                    <td class="px-2 py-1">{{ pedido.pedidoId }}</td>
                    <td class="px-2 py-1">{{ pedido.valorPedido.toLocaleString('pt-PT', { style: 'currency', currency: 'AOA' }) }}</td>
                    <td class="px-2 py-1">{{ new Date(pedido.dataPedido).toISOString().split('.')[0]}}</td>
                    <td class="px-2 py-1">{{ pedido.isAceite ? 'Realizado' : 'Pendente' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { post } from '../../../Servicos/PostPedido';
import { getData } from '../../../Servicos/GetData';
import { useRouter } from 'vue-router';
import { getMyPedidos } from '../../../Servicos/GetMyPedidos';

const router = useRouter();
const pedidos = reactive([]);
//pegando o valor do select
onMounted(async () => {
    await MeusDados();
    const meusPedidos = await getMyPedidos();
    if (meusPedidos) {
        pedidos.push(...meusPedidos);
    } else {
        console.error("Falha ao obter os pedidos do usuário.");
        router.push('/');
    }
});
const valor = ref('')
let UserName = ref('')

const MeusDados = async ()=>
{
    const response = await getData();
    if (response) {
        UserName.value = response.nome;
    } else {
        console.error("Falha ao obter os dados do usuário.");
    }
}


const FazerPedido = async()=>
{
    const response = await post(valor.value);
    if (response) {
        console.log("Pedido realizado com sucesso:", response); 
        pedidos.push(response)   
    } else {
        console.error("Falha ao realizar o pedido, direcionado para o login.");
        router.push('/');
    }
}
</script>