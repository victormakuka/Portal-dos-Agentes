<template>
    <div class="relative">
        <div class="fixed top-0 right-2 h-screen  z-50"> 
     <div class=" flex items-center justify-center p-4  h-screen w-screen">
<!-- A caixa do perfil todo. -->
        <div class=" h-[350px] w-[395px] flex items-center justify-center bg-gray-200 grid grid-cols-3  grid-rows-6 mb-14"> 
            <div class=" col-3 row-1 text-end p-2  mb-[33px] ">
                <!-- Botão de fechar p perfil -->
                <div class="flex text-end items-center justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 cursor-pointer " @click="fecharPerfil()">
  <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>
 </div>
            </div>
            <!-- A linha que separa o nome e os dados -->
            <hr class="text-white flex items-center justify-center row-2 ml-10 mr-[33px] col-span-3 ">

            <!-- Icon de Perfil -->
            <div class=" col-1  row-1 flex items-center justify-center mt-[40px] ml-[60px] text-white font-bold ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-18">
  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>
                <div class="col-3 w-[1px] row-2 whitespace-nowrap mb-[5px] ">
                   <div class=" text-black text-md">
                      Victor Makuka
                      <p>0815</p>
                   </div>
            </div>

            </div>
            <div class="col-1 row-3 whitespace-nowrap ml-10">
                <span>Nº de Telefone</span>
        
                <p class="text-gray-500">939 399 825</p>
            </div>
             <div class="col-1 row-4 whitespace-nowrap ml-10">
                E-mail
                <p class="mb-[14px] text-gray-500">victormakuka1@gmail.com</p>
            </div>
             <div class="col-3 row-3 whitespace-nowrap mt-5 px-4">
                Endereço
                <p class="mb-[14px] text-gray-500">Cacuaco</p>
            </div>
            <div class="flex ml-[-40px] space-x-4 row-5 col-3 whitespace-nowrap mt-5 ">
                <!-- Eliminar -->
                
          <div class="pt-4 col-2 whitespace-nowrap">
            <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-400 cursor-pointer ">Eliminar</button>
          </div>
                <!-- Editar -->
               <div class="pt-4 row-6 col-3 whitespace-nowrap">
            <button type="submit" class="bg-blue-700 text-white px-2 py-1 rounded-md hover:bg-blue-800 cursor-pointer">Editar</button>
          </div>
            </div>
        </div>
    </div>
    </div>
     <div class="fixed inset-0 bg-black/20 z-20"></div>
     </div>
</template>

<script>
export default {
    data() {
        
    },
    methods: {
        fecharPerfil() {
            this.$emit('fechar-perfil');
        },
        verPerfil() {
            this.$emit('ver-perfil');
        }
    }
}
</script>