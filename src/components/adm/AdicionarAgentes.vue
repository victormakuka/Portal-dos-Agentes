<script setup>
import { reactive } from 'vue'
import Menu from '@/components/adm/Menu.vue'
import api from '../Requisições/Urlapi'
import { auth } from '../../../Servicos/Auth'
import { useRouter } from 'vue-router'


const router = useRouter()

// Objeto reativo para o formulário
const form = reactive({
  nome: '',
  id: '',
  email: '',
  telefone: '',
  endereco: ''
})

const Add = async () => {
  try {
    const token = sessionStorage.getItem('accessToken')

    const formData = new FormData()
    formData.append('agenteId', form.id)
    formData.append('nome', form.nome)
    formData.append('email', form.email)
    formData.append('telefone', form.telefone)
    formData.append('endereco', form.endereco)

    const response = await api.post('/api/User', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    console.log(response.data)
    alert('Agente cadastrado com sucesso!')
  } catch (error) {
           if (error.response && error.response.status === 401) {
           if(await auth()){
               console.warn("Tentando cadastrar novamente após renovar o token...");
               return await Add(); // Tenta novamente após renovar o token
           } else {
               console.warn("Falha ao renovar o token de acesso. Redirecionando para a página de login...");
               return false
           }
        }
        console.error("Erro ao obter a lista de usuários:", error);
        throw error; // Lança o erro para ser tratado em outro lugar
  }
}



async function handleSubmit() {
  const camposValidos = Object.values(form).every(campo => campo.trim() !== '')
  if (camposValidos) {
    if(!await Add())
      router.push('/')

    // Resetar formulário
    form.nome = ''
    form.id = ''
    form.email = ''
    form.telefone = ''
    form.endereco = ''
  } else {
    alert('Por favor, preencha todos os campos corretamente.')
  }
}
</script>


<template>

  <div class=" text-black font-sans min-h-screen">
    <!-- Cabeçalho -->
      <!-- Div do header-laranja -->
      <div class="w-full h-30 fixed bg-orange-500  ">
        <!-- Botão de voltar -->
        <div class="text-xl font-bold px-3 py-2 flex flex-row text-white">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mt-1.5"> 
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
                Adicionar
       </div>
       <!-- Descrição do header -->
        <div class="px-12">
       <div class="text-sm text-white whitespace-nowrap">
         Cadastre novos subagentes de forma rápida
        </div>
         <div class="text-sm text-white whitespace-nowrap ">e segura.</div>
        </div>
    </div>

    <!-- Formulário -->

    <div class="flex items-center justify-center h-full ">
    <main class=" mt-10  py-24 px-8">
      <div class="fixed py-2 top-6 left-0 z-10">
            <Menu/>
        </div>
      <div class="">
        <h2 class="text-2xl font-bold mb-6 text-center sm:text-left">Cadastrar novo agente</h2>
        <div class="">

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="block font-medium mb-1">Nome</label>
            <input v-model="form.nome" type="text" class="w-full p-2 border border-orange-500 rounded-lg" placeholder="Nome completo" required />
          </div>
            
          <div>
            <label class="block font-medium mb-1">ID</label>
            <input v-model="form.id" type="text" class="w-full p-2 border border-orange-500 rounded-lg" placeholder="ID do agente" required />
          </div>
          <div>
            <label class="block font-medium mb-1">Email</label>
            <input v-model="form.email" type="email" class="w-full p-2 border border-orange-500 rounded-lg" placeholder="email@exemplo.com" required />
          </div>

          <div>
            <label class="block font-medium mb-1">Número de Telefone</label>
            <input v-model="form.telefone" type="tel" class="w-full p-2 border border-orange-500 rounded-lg" placeholder="(+244) 999-999-999" required pattern="\+?[0-9\s-]{9,15}" />
          </div>

          <div>
            <label class="block font-medium mb-1">Endereço</label>
            <input v-model="form.endereco" type="text" class="w-full p-2 border border-orange-500 rounded-lg" placeholder="Endereço completo" required />
          </div>

          <div class="pt-4">
            <button type="submit" class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full sm:w-auto">Cadastrar</button>
          </div>
        </form>
      </div>
      </div>
       
    </main>
  </div>
  </div>


</template>


<style scoped>
/* Adicional: garantir que a altura ocupe a tela toda */
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
