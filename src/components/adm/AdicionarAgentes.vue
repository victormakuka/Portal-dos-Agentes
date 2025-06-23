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

  <div class="bg-gray-100 text-black font-sans min-h-screen">
    <!-- Cabeçalho -->
      <div class="m-0 py-4 px-12 border  border-gray-300 shadow-sm w-[395px]"> <div class="text-md font-bold ">Adicionar Novos Subagentes</div> <div class="text-sm text-gray-600 whitespace-nowrap ">Cadastre novos subagentes de forma rápida e segura.</div></div>

    <!-- Formulário -->

    <div class="">
    <main class="flex justify-center items-start sm:items-center mt-10 px-4 py-12 px-8">
      <div class="absolute top-6 left-0 z-10">
            <Menu/>
        </div>
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-2xl border border-orange-500">
        <h2 class="text-2xl font-bold mb-6 text-center sm:text-left">Cadastrar novo agente</h2>

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
