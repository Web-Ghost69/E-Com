//Accessing element for side bar
let openBtn = document.querySelector(".Open-btn")
let closeBtn = document.querySelector(".Close-btn")
let sidebar=document.querySelector(".Side-bar")


//Accessing Container for storing Cart items
let CartContainer = document.querySelector(".Cart-Container")


//Creating Sidebar
openBtn.addEventListener("click",()=>
    {
        sidebar.classList.add("active")
    })
    
    closeBtn.addEventListener("click",()=>
        {
            sidebar.classList.remove("active")
        })

//Acccesing local storage for getting item push in cart from home page
    let cart= JSON.parse(localStorage.getItem('item'));


//Function for getting Add To cart items

const cartItems=()=>
    {

        if(cart.length===0)
            {
            return( CartContainer.innerHTML="<h1>EMPTY</h1>" );
            }
            else
            {
                cart.map(item=>
                    {
                       let {image,title,price,id,description}=item; 
        
                       return CartContainer.innerHTML += `<div class="Cart-Items">
                            <div class="img-container"><img src="${image}" alt="" class="Img"></div>
                                <div class="Item-specs">
                                    <h2 class="price">$${price}</h2>
                                    <h5 class="title">${title}</h5>
                                        <p class="Description"><i>${description}</i></p>
                                </div>
                                    <div class="removebtn"><button  class=" Remove-btn" onclick="removeItem('${id}')">Remove</button></div>
                             </div>`
                    })
            }
        
        


    }


    


   

    
//Function for Cart Icon Value
    let cartIcon =()=>
        {
            let CartIcon= document.querySelector(".Cart-Icon")
             let cartVal=cart.length
            CartIcon.innerHTML =`<sup>${cartVal}</sup>`
           
        }


//Function for Removing items from cart
    let removeItem=(id)=>
        {
            cart=cart.filter(items=>items.id!=id)
            localStorage.setItem('item',JSON.stringify(cart))
            CartContainer.addEventListener("click",(e)=>
            {
                if(e.target.classList.contains('Remove-btn'))
                    {
                      e.target.parentElement.parentElement.remove();
                    }
            })
           
            cartIcon();
            totalPrice()


           
           
        }
    


        //function for calculating and showing total price 


        let totalPrice=()=>
            {
                    let Tprice=0;
                    cart.map((item)=>
                        {
                            Tprice+= +item.price ;

                        })
                        let price=Tprice.toFixed()
                            let TotalPrice=document.querySelector(".Total-Price")
                                 TotalPrice.innerHTML = 
                         `<div>
                         <h2>TOTAL PRICE : $${price}</h2>
                         <button class="Buy-Now-Button"> Buy Now </button>
                         </div>`     
            }
         
    

           
//Function call

cartIcon();
cartItems();
totalPrice();


    
