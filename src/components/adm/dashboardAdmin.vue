<script setup>
import Menu from './Menu.vue'
import alerta from '@/components/alerta.vue';
import { getData } from '../../../Servicos/GetData';
import { useRouter } from 'vue-router';

const router = useRouter();

const buscarDados = async () => {
  const userData = await getData();
  console.log("Dados do usuário:", userData);
  if (!userData) {
    router.push('/');
  }
};

</script>

  <template>
<div class="fixed h-30 w-full bg-orange-500 shadow-sm ">

   <div class="flex flex-row items-center justify-center h-full pr-4">
     <input 
     type="text"
     class="bg-white rounded-sm px-2 py-2 text-sm"
     placeholder="Pesquisar"
     >

     <div class="px-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

     </div>

     <div  class="">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
     </svg>
    </div>
   </div>
   
  </div>
    
  <main class="py-9">
     <Menu/>
  </main>

  <button type="button" @click="buscarDados"></button>

</template>