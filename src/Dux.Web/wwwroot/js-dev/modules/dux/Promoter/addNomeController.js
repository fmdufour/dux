(function () {
    'use strict';

    angular
        .module('dux')
        .controller('addNomeController', addNomeController);

    addNomeController.$inject = ['ngDialog', 'toastr', '$location', '$stateParams',
                                 'ListasService', 'PromoterService', 'DistribuicaoService'];

    function addNomeController(ngDialog, toastr, $location, $stateParams, ListasService, PromoterService, DistribuicaoService) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        vm.erros = [];
        vm.form= {
            nomes : [],
            listaId : null
        }

        function activate() {
            var id = $stateParams.id;
            vm.nomesM = 0;
            vm.nomesF = 0;
            vm.blocoNomes = '';
            vm.instrucoes = false;
            vm.exibirErros = false;
            vm.infoLista = false;
            

            PromoterService.getNomes(id).then(function (response) {
                preencheTexto(response.data);
            });

            ListasService.getLista(id).then(function (response) {
                vm.lista = response.data;
                vm.form.listaId = vm.lista.id;

                DistribuicaoService.getQtdNomes(vm.lista.id).then(function (response) {
                    vm.dist = response.data;
                })
            });
        }

        function preencheTexto(nomes) {
            nomes.forEach(function (nome) {
                vm.blocoNomes = vm.blocoNomes + (nome.masculino ? 'M' : 'F')
                 + ' ' + nome.nome + (nome.numCelular ? ' ' + nome.numCelular : '')
                 + (nome.numRg ? ' ' + nome.numRg : '\n');

                nome.masculino ? vm.nomesM++ : vm.nomesF++;
            });
        }


        vm.change = function () {
            var linhas = vm.blocoNomes.split('\n');            
            vm.form.nomes = [];
            vm.erros = [];
            var nomesM = 0;
            var nomesF = 0;

            for (var i = 0; i < linhas.length; i++) {

                if (vm.lista.exigirCelular && vm.lista.exigirRg) {                    
                    var matches = /^(M|F)\s+([^\-0-9]+)\s+(\d+)\s+(\d{4,15})\s*$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto (GÊNERO NOME NºCELULAR NºRG)');
                    }
                    else {
                        matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;

                        vm.form.nomes.push({
                            masculino: matches[1].toUpperCase() == 'M' ? true : false,
                            nome : matches[2],
                            numCelular : matches[3],
                            numRg : matches[4]
                        });
                    }
                }
                else if (vm.lista.exigirCelular) {
                    var matches = /^(M|F)\s+([^\-0-9]+)\s+(\d+)\s*$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto');
                    }
                    else {
                        if (/^[1-9]{2}[9]{0,1}[6-9]{1}[0-9]{3}[0-9]{4}$/.test(matches[3]) == false) {
                            vm.erros.push('Na linha nº ' + (i + 1) + ' o número do celular não está no formato correto (nº com DDD)');
                        }
                        else {
                            matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;

                            vm.form.nomes.push({
                                masculino: matches[1].toUpperCase() == 'M' ? true : false,
                                nome: matches[2],
                                numCelular: matches[3]
                            });
                        }
                    }
                }
                else if (vm.lista.exigirRg) {
                    var matches = /^(M|F)\s+([^\-0-9]+)\s+(\d{4,15})\s*$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto');
                    }
                    else {
                        matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;

                        vm.form.nomes.push({
                            masculino: matches[1].toUpperCase() == 'M' ? true : false,
                            nome: matches[2],
                            numCelular: matches[3]
                        });
                    }
                }
                else {
                    var matches = /^(M|F)\s+([^\-[0-9]+)(\s*|\s+([1-9]{2}[9]{0,1}[6-9]{1}[0-9]{3}[0-9]{4})?)$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto');
                    }
                    else {
                        matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;                                                                                                                                                    

                        vm.form.nomes.push({
                            masculino: matches[1].toUpperCase() == 'M'? true : false,
                            nome: matches[2],
                            numCelular: matches[4] == undefined ? null : matches[4]                            
                        });
                    }
                }
            }

            vm.nomesM = angular.copy(nomesM);
            vm.nomesF = angular.copy(nomesF);
        }


        vm.addNomes = function () {
            PromoterService.addNomes(vm.form).then(function(response){
                toastr.success('Os nomes foram adicionados com sucesso', 'Adicionados');
            })
            .catch(function (response) {
                
            })
        }

        vm.mostrarInstrucoes = function () {
            vm.instrucoes = !vm.instrucoes;
        }

        vm.mostrarErros = function () {
            vm.exibirErros = !vm.exibirErros;
        }

        vm.mostrarInfoLista = function () {
            vm.infoLista = !vm.infoLista;
        }
        

    }
})();
