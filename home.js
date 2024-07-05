//Accessing element for side bar
let openBtn = document.querySelector(".Open-btn")
let closeBtn = document.querySelector(".Close-btn")
let sidebar=document.querySelector(".Side-bar")
let searchBtn = document.querySelector(".Search-btn")

//Accessing container where yyou can store fetch data
let ProductContainer=document.querySelector(".Product-Container")
let MainSection=document.querySelector(".Main-Section")
let SearchSection=document.querySelector(".Search-Section")


//Accessing Search Section where you get search item
let SearchContainer=document.querySelector(".Search-Container")



let cart = JSON.parse(localStorage.getItem('item')) || [];



// making array for storing dataval
let search=[];


//Creating Sidebar
openBtn.addEventListener("click",()=>
    {
        sidebar.classList.add("active")
    })
    
    closeBtn.addEventListener("click",()=>
        {
            sidebar.classList.remove("active")
        })




//gettting data from api 
const getData=async()=>
    {
        try{

            let response = await fetch('https://fakestoreapi.com/products')
            let data=  await response.json()
        


        data.map(item=>
            {
                let {image,title,id,price,description} = item;


                return ProductContainer.innerHTML+=` <div class="Product-item">
                        <div class="Product-img"> 
                            <img src="${image}" alt="" class="Img" >
                        </div>

                        <div class="Product-specs">
                             <h2 class="Price">$${price}</h2> 
                             <p class="Title">${title}</p> 
                             <button class="addToCart" onclick="AddToCart('${image}','${price}','${title}','${id}','${description}')">Add to cart<button>
                        </div>
                    </div>`;

            })

// adding eventlistener to search btn  to get search items
            searchBtn.addEventListener("click",(e)=>
                {

                let Input = document.querySelector(".Search-bar").value.toLowerCase()


                    // breaking data items using map
                data.map((item)=>
                    {
                        //checking if the title is same as input value
                                let dataVal= data.filter((item=>item.title.toLowerCase().includes(Input)))


                                //breaking dataVal element and adding it in search array
                                dataVal.forEach(element => {


                                    if(Input==="")
                                    {
                                       
                                            MainSection.style.display="flex"
                                            SearchSection.style.display="none"
                                    }
                                   else if(!search.includes(element))
                                    {
                                        search.push(element)
                                        
                                        MainSection.style.display="none"
                                        SearchSection.style.display="flex"
                                        SearchContainer.innerHTML+=` <div class="Search-item">
                                            <div class="Cart-img">
                                                <img  class="Img"  src="${element.image}" alt="">
                                    
                                            </div>
                                            <div class="Product-specs">
                                                    <p class="price">${element.price}</p>
                                                    <p class="title">${element.title}</p>
                                                    <button class="addToCart" onclick="AddToCart('${element.image}','${element.price}','${element.title}','${element.id}','${element.description}')">Add to cart<button>
                                            </div>
                                    </div>`


                                    } 
                                });
                       }
                    )
                })
        }
        catch(err)
        {
            document.querySelector("body").innerText ="Error:" + err
        }
    }
 

    //Function or increasing value  of Cart-icon

    let cartIcon =()=>
        {
            let CartIcon= document.querySelector(".Cart-Icon")
            CartIcon.innerHTML =`<sup>${cart.length}</sup>`
        }



    //fucntion for btn click event adding item to cart
 const AddToCart=(image,price,title,id, description)=>
    {
        cart.push({
            image:image,
            title:title,
            price:price,
            id:id,
            description:description
        })
        localStorage.setItem('item' ,JSON.stringify(cart))
        cartIcon()
    }

    //Function for search bar

    


    //Function Call

    cartIcon()
    getData();





