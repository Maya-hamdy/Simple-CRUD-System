
  let productName=document.getElementById('productName');
  let productCategory=document.getElementById('productCategory');
  let productPrice=document.getElementById('ProductPrice');
  let productDescription=document.getElementById('productDescription');
  let tbody=document.getElementById('tbody');
  let searchBtn=document.getElementById('search');
  let btnsContainer=document.getElementById('btnsContainer');



  
if(localStorage.getItem("productsData")){
      var products=JSON.parse(localStorage.getItem("productsData"))
}else{
      var products=[];
}


  function addProduct(){
    let product={
        pName:productName.value,
        pCat:productCategory.value,
        pPrice:productPrice.value,
        pDesc:productDescription.value
    };
    products.push(product);
    console.log(products);
    localStorage.setItem("productsData",JSON.stringify(products));
    displayProduct();
    clearProduct();
  }

  displayProduct();
  

  function deleteProduct(i){

    products.splice(i,1);
    localStorage.setItem("productsData",JSON.stringify(products));
    displayProduct();

  }

  function clearProduct(){
    productName.value="";
    productCategory.value="";
    productPrice.value="";
    productDescription.value="";
  }


searchBtn.addEventListener('keyup',()  =>{
  displayProduct(searchBtn.value);
});





function displayProduct(keyWord = "") {
  let box = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (product.pName.includes(keyWord)) {
      box += `
      <tr>
           <td>${i}</td>
           <td>${products[i].pName.replace(keyWord, `<span class="highlight"> ${keyWord}</span>`)}</td>
           <td>${products[i].pCat}</td>
           <td>${products[i].pPrice}</td>
           <td>${products[i].pDesc}</td>
           <td><button class="btn btn-warning" onclick="moveValue(${i})">Update</button></td>
           <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete </button></td>
       </tr>
     `;
    }
  }
  tbody.innerHTML=box;
}




function moveValue(i){
  productName.value=products[i].pName;
  productCategory.value=products[i].pCat;
  productPrice.value=products[i].pPrice;
  productDescription.value=products[i].pDesc;

  btnsContainer.innerHTML= `<button class="btn btn-outline-info my-3" onclick="updateProduct(${i})">Update Product</button>`;
}





function updateProduct(i){
    products=JSON.parse(localStorage.getItem("productsData"));
    products[i].pname=productName.value;
    products[i].pCat=productCategory.value;
    products[i].pPrice=productPrice.value;
    products[i].pDesc=productDescription.value;
    localStorage.setItem("productsData",JSON.stringify(products));
    displayProduct();
    clearProduct();
    
    btnsContainer.innerHTML= `<button id="update" class="btn btn-outline-info my-3" onclick="addProduct()">Add Product</button>`;
}