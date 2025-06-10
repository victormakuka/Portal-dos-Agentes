<template>
  <div class="bg-gray-100 text-black font-sans min-h-screen">
    <!-- Cabeçalho -->
    <header class="bg-white shadow-md px-4 py-4 flex justify-center sm:justify-center items-center gap-3 border-b border-orange-500 sm:ml-52">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      <h1 class="text-xl font-semibold">Adicionar Agente</h1>
    </header>

    <!-- Formulário -->
    <main class="flex justify-center items-start sm:items-center mt-10 px-4">
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
            <label class="block font-medium mb-1">Senha</label>
            <input v-model="form.senha" type="password" class="w-full p-2 border border-orange-500 rounded-lg" placeholder="Senha segura" required minlength="6" />
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
  <Menu />
</template>

<script>

 import Menu from '@/components/adm/menu.vue';
export default {
  name: 'CadastroAgente',
 
  data() {
    return {
      form: {
        nome: '',
        id: '',
        senha: '',
        email: '',
        telefone: '',
        endereco: ''
      }
    };
  },
  components:{
    Menu
  },
  methods: {
    handleSubmit() {
      const camposValidos = Object.values(this.form).every(campo => campo.trim() !== '');
      if (camposValidos) {
        alert('Agente cadastrado com sucesso!');
        this.form = {
          nome: '',
          id: '',
          senha: '',
          email: '',
          telefone: '',
          endereco: ''
        };
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    }
  }
};
</script>

<style scoped>
/* Adicional: garantir que a altura ocupe a tela toda */
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
