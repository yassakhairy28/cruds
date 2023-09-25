// Get Element
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let creat = document.getElementById("creat")
let search = document.getElementById("search")
let searchTitle = document.getElementById("searchTitle")
let searchCategory = document.getElementById("searchCategory")

let mod = "create"
let tmp;

function totalPrice () {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result
        total.style.backgroundColor = "#009688"
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(133, 5, 5)"
    }
}

let datapro;

if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}
creat.onclick = function () {
    let newpro =  {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    } 
    if (title.value != "" && price.value != "" && category.value != "" && count.value <= 100) {
            if (mod === "create") {
            if (newpro.count > 0) {
        for (i=0; i < newpro.count;i++) {
        datapro.push(newpro)
        }
    } else {
        datapro.push(newpro)
    }
    } else {
        datapro[tmp] = newpro
        mod = "create"
        creat.value = "Create"
        count.style.display = "block"
    }
    deletetxt()
    }



    localStorage.setItem("product", JSON.stringify(datapro))
    showData()
}

function deletetxt() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

function showData () {
    totalPrice ()
    let table = ""
    for (i = 0; i < datapro.length; i++) {
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick='updateData(${i})'>Update</button></td>
        <td><button onclick="deletepro(${i})">Delete</button></td>
    </tr>
        `
        document.getElementById("tbody").innerHTML = table
        let btnDelteAll = document.getElementById("deleteall")
        if (datapro.length > 0) {
            btnDelteAll.innerHTML = `<button id='deleteAll' onclick='DeleteAll ()'>Delete All(${datapro.length})</button>`
        } else {
            btnDelteAll.innerHTML = "";
        }
    }
}
showData ()

function deletepro (i) {
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro)
    showData ()
}

function DeleteAll () {
    datapro.splice(0);
    localStorage.clear()
    showData ()
}

function updateData (i) {
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    totalPrice()
    category.value = datapro[i].category
    count.style.display = "none"
    creat.value = "Update"
    mod = "update"
    scroll({
        top:0,
        behavior: "smooth"
    })
    tmp = i;
}

let searchMod = "title"
function getSearchMod (id) {
    search.value = ""
    showData ()
    if (id == "searchTitle") {
        searchMod =  "title"
    } else {
        searchMod =  "category"
    }
    search.focus()
    search.placeholder = `Search By ${searchMod}`
} 

function searchData (value) {
    let table = ""
    for (i=0; i < datapro.length; i++) {
        if (searchMod == "title") {
                if (datapro[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                    <td>${[i]}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updateData(${i})'>Update</button></td>
                    <td><button onclick="deletepro(${i})">Delete</button></td>
                </tr>
                    `
                }

            } else {
                if (datapro[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                    <td>${[i]}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updateData(${i})'>Update</button></td>
                    <td><button onclick="deletepro(${i})">Delete</button></td>
                </tr>
                    `
                }
        }
    }
        document.getElementById("tbody").innerHTML = table
}