// instância o app
var app = angular.module('todoApp', []);

app.controller("myCtrl", function($scope, $http) {

    // notificação
    $scope.notifica = function(status, msg) {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        return toast({
            type: status,
            title: msg
        });
    }

    // busca todos os dados
    $scope.getAll = function() {
        $http.get("api/get/tasks")
            .then(function (tasks) {
                $scope.tasks = tasks;
                //console.log(tasks);
            });
    }
    $scope.getAll()

    // cria uma nova tarefa
    $scope.createTodo = function(){
        $http.post('api/create/todo', $scope.todo)
            .then(function(success){
                // console.log($scope.todo);
                // console.log(success.status);
                $scope.getAll();
                $scope.notifica('success', 'Tarefa criada com sucesso!');
                $scope.todo.task = "";

            }, function(error){
                console.log(error.status);
            });
    }

    // Altera o status do campo done da tarefa
    $scope.done = function(id, task) {
        // console.log('done', id)
        // console.log('done', task)
        
        $http.put('api/put/task/' + id, task)
            .then(function(success){
                $scope.notifica('success', 'Tarefa atualizada com sucesso!')

            }, function(error){
                console.log(error.status);

            });
    }


    // deleta a tarefa
    $scope.deleteTask = function deleteTask(taskId) {
        $http.delete("/api/delete/task/"+taskId)
            .then(function(){
                // console.log('success');
                $scope.getAll();
                $scope.notifica('success', 'Tarefa deletada com sucesso!');

            },function(error){
                console.log('Error', error);
            });
    }


});