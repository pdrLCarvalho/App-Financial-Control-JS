class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == null || this[i] == ''){
                return false
            }
        }
        return true
    }
}

class DataBase{
    constructor(){
        let id = localStorage.getItem('id')
        
        if(id === null){
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) +1
    }

    gravar(despesa){
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(despesa))
        localStorage.setItem('id',id)
    }

    recuperarRegistros(){
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i<=id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //verificar se algum indice foi pulado/removido
            if(despesa === null){
                continue
            }
            despesa.id = i
            despesas.push(despesa)       
        }
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarRegistros()

        //aplicando os filtros
        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(element => element.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(element => element.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(element => element.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(element => element.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(element => element.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(element => element.valor == despesa.valor)
        }
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let database = new DataBase()

    
function cadastrarDespesa(){
    //recuperando os dados inseridos no frontend
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value,mes.value,dia.value,tipo.value,descricao.value,valor.value)

    if(despesa.validarDados()){
        database.gravar(despesa)
        document.getElementById('modalHeader').className = 'modal-header text-success'
        document.getElementById('tituloModal').innerText = 'Registro inserido com sucesso'
        document.getElementById('modalBody').innerText = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modalButton').className = 'btn btn-success'
        document.getElementById('modalButton').innerText = 'Voltar'
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else{
        document.getElementById('modalHeader').className = 'modal-header text-danger'
        document.getElementById('tituloModal').innerText = 'Erro na inclusão do registo'
        document.getElementById('modalBody').innerText = 'Algum dos campos obrigatórios não foi preenchido corretamente.'
        document.getElementById('modalButton').className = 'btn btn-danger'
        document.getElementById('modalButton').innerText = 'Voltar e corrigir'
        $('#modalRegistraDespesa').modal('show')
    }
    
}

function carregaListaDespesas(despesas = Array(),filtro = false){
    if(despesas.length == 0 && filtro == false){
        despesas = database.recuperarRegistros()
    }
    
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(element => {
        //criando a tabela
        let row = listaDespesas.insertRow()

        //criar as colunas
        row.insertCell(0).innerHTML = `${element.dia}/${element.mes}/${element.ano}`

        //ajustando o tipo
        switch(element.tipo){
            case '1': element.tipo = 'Alimentação'
                break
            case '2': element.tipo = 'Educação'
                break
            case '3': element.tipo = 'Lazer'
                break
            case '4': element.tipo = 'Saúde'
                break
            case '5': element.tipo = 'Transporte'
                break
        }

        row.insertCell(1).innerHTML = element.tipo
        row.insertCell(2).innerHTML = element.descricao
        row.insertCell(3).innerHTML = element.valor

        //criar o botão de exlusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${element.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            database.remover(id)
            window.location.reload()
        }
        row.insertCell(4).append(btn)

        console.log(element)
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
    
    let despesaPesquisada = database.pesquisar(despesa)
    console.log(despesaPesquisada)
    carregaListaDespesas(despesaPesquisada, true)
}
