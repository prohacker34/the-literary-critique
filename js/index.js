let formInfo=document.getElementById("form")
formInfo.addEventListener('submit',(event)=>{
event.preventDefault
let formInfo = new formInfo(this);




})
fetch("http://localhost:3000/books")
  .then(function (res) {
    return res.json();
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });