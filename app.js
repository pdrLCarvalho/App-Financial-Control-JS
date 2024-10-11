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
        //database.gravar(despesa)
        document.getElementById('modalHeader').className = 'modal-header text-success'
        document.getElementById('tituloModal').innerText = 'Registro inserido com sucesso'
        document.getElementById('modalBody').innerText = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modalButton').className = 'btn btn-success'
        document.getElementById('modalButton').innerText = 'Voltar'
        $('#modalRegistraDespesa').modal('show')

    } else{
        document.getElementById('modalHeader').className = 'modal-header text-danger'
        document.getElementById('tituloModal').innerText = 'Erro na inclusão do registo'
        document.getElementById('modalBody').innerText = 'Algum dos campos obrigatórios não foi preenchido corretamente.'
        document.getElementById('modalButton').className = 'btn btn-danger'
        document.getElementById('modalButton').innerText = 'Voltar e corrigir'
        $('#modalRegistraDespesa').modal('show')
    }
    
}

