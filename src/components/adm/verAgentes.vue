<template>
    <body class="bg-gray-100 h-screen w-screen">  
   <div class="m-0 py-4 px-12 border  border-gray-300 shadow-sm w-[395px]">
     <div class="text-md font-bold ">Vejâ todos seus Subagentes</div> <div class="text-sm text-gray-600  ">Faça a gestão dos seus Subagentes editando e alterando os dados dos seus Subagentes.
     </div>
    </div>
    
    <div class="absolute top-6 left-0 z-10">
            <Menu/>
        </div>
    
 <div class="py-24 px-10 whitespace-nowrap">
     
  <div class="text-2xl font-bold flex flex-row items-end ">
   Todos Agentes
  </div>

  <div class="py-4 ">
    <table >
        <thead >
            <tr>
                <th class="py-3">ID</th>
                <th>NOME</th>
               
            </tr>
        </thead>
        
        <tbody class="">
          <tr 
            v-for="(agente, index) in agentes"
            :key="agente.id"
            @click="verPerfil(agente)"
            :class="['cursor-pointer hover:opacity-80', 
             index % 2 === 0 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black']"
          > 
            <td class="px-2 py-2">{{ agente.id }}</td>
            <td class="px-20">{{ agente.nome }}</td>
          </tr>
        </tbody> 
        
    </table>
    
    <div class="flex items-end justify-end  mr-[-3px]">
    <button class="text-sm text-gray-200 font-semibold bg-orange-500 hover:bg-orange-400 py-2 px-2 mt-4 flex items-end justify-end rounded-md">
        Ver mais
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
</svg>

    </button>
   </div>
    
  </div>
</div> 

   <main v-if="aparcerPerfil">
    <verPerfil 
     @fechar-perfil="aparcerPerfil = false"
     :agente="agenteSelecionado"
     />
   </main>
 </body>
</template>


<script >
import verPerfil from './verPerfil.vue';
export default {
  components: {
            verPerfil
  },
  methods: {
    verPerfil(agente) {
    this.agenteSelecionado = agente; // Define qual agente foi clicado
    this.aparcerPerfil = true;       // Mostra o componente
  },
    
  },
  
  data() {
    return {
      aparcerPerfil: false, // Controla a exibição do perfil
      agenteSelecionado: null,
      agentes: [
        {
          id: 234,
          nome: "Kennedy Victor",
          numero: 940292710,
          email:"kennedyjoao123@gmail.com",
          endereco:"cacuaco"
        },
        {
          id: 235,
          nome: "Silva André",
          numero: 936421730,
          email: "silvaandre123@gmail.com",
          endereco:"Cacuaco"
        },
        {
          id: 235,
          nome: "Victor Makuka",
          numero: 939399825,
          email:"victormakuka1@gmail.com",
          endereco:"Cacuaco"
        },
        {
          id: 235,
          nome: "Edvaldo João",
          numero: 936008338,
          email:"edvaldojoao123@gmail.com",
          endereco:"Viana"
        },
        {
          id: 123,
          nome: "Abraão Eduardo",
          numero: 941036220,
          email:"abraaoeduardo123@gmail.com",
          endereco:"Zango 3mil"
        },
        
        
      ],
            }
          }
   
}
 
</script>