// ng-app decleration
var app=angular.module("translator",[]);
// ng-controller decleration
app.controller("TransCtrl",[
    // inject $scope to controller
    '$scope',
    function($scope){
       // translation results variable
       $scope.translation=null;
       $scope.status="primary";
       // available languages list
       $scope.lang=[
       {disp:"English",val:"eng"},
       {disp:"Hebrew",val:"heb"},
       {disp:"Hindi",val:"hin"},
       {disp:"Italian",val:"ita"},
       {disp:"Russian",val:"rus"},
       {disp:"German",val:"deu"},
       {disp:"Arabic",val:"aao"},
       {disp:"French",val:"fra"},
       {disp:"Afrikaans",val:"afr"},
       {disp:"Manual Select",val:"manual"}
       ];
        
       // translation method
       $scope.translate=function(){
       $scope.status="primary";
       // retreive from/to languages (required since manual mode is also available)
       from=(($scope.langSrc.val!=="manual")? $scope.langSrc.val:$scope.manualSrc);
       
       to=(($scope.langDest.val!=="manual")? $scope.langDest.val:$scope.manualDest);
       
       // check valid input
       if(from===undefined || from.length===0 || to===undefined || to.length===0){return;}
       // clear previous results
       $scope.translation=[];
       // build url for GET request with parameters taken from the form in the HTML
           url="https://glosbe.com/gapi/translate?from="+from+"&dest="+to+"&format=json&phrase="+$scope.text+"&pretty=true";
    
            // create the ajax request (selecting dataType: jsonp is key to the success of the request)
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: url,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function(result){
                   // attach the results to the translation variable
                    $scope.translation=result;
                    //forces angular to check for changes
                    $scope.status="success";
                    $scope.$digest();
                },
                error: function (err) {
                   $scope.translation=err;
                   $scope.status="danger";
                   $scope.$digest();
                   //console.log(JSON.stringify(err));
                }
            });
        }
    }
]);

app.filter('removeHTMLTags', function() {
// create filter to remove html tags and &#xx; tags
    return function(text) {
// remove any <tag> in a given text
        text = text ? String(text).replace(/<[^>]+>/gm, '') : '';
// remove any &quot; in a given text
        text = text ? String(text).replace(/&quot;/gm, '') : '';
// remove any &#xx; in a given text
        return text ? String(text).replace(/&#[0-9]+;/gm, '') : '';
    };
});
