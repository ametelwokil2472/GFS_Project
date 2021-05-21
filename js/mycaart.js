var imgSource = "./images/products/";
myCartStorage = window.localStorage;
//var cartItemsAdded = [];

$( document ).ready(function() {
    $('.carousel').carousel();

    try{
        var _idFeaturePrd = document.getElementById("idFeatureProduct");
        _idFeaturePrd.style.display = "none";
    
        var _idFeatureProductDivider = document.getElementById("idFeatureProductDivider");
        _idFeatureProductDivider.style.display = "none";
    } catch(err){

    }


    try{
        var cartItemsAdded = localStorage.getItem('myCartItems').split(",");
        var _idCartItem = document.getElementById("idCartItem");
        _idCartItem.innerHTML = cartItemsAdded.length;

        var _idCartCount = document.getElementById("idCartCount");
        _idCartCount.innerHTML = "You have ("+ cartItemsAdded.length + ") items";
    } catch(err){

    }

    idSubmitSearch();
    
});

/**
 * Function will show/hide category
 * @param {none}  
 */
function idSubmitSearch(type){
    var allCategoryList = ["Jewelry", "Dresses", "Headphones"];
    var searchCat = '';
    try{
        searchCat = document.getElementById("idSearchCat").value;
    }catch(err){

    }
    
    if (type=='reset'){
        searchCat = '';
        document.getElementById("idSearchCat").value = searchCat;
    }
    for (i=0; i<allCategoryList.length; i++){
        _catName = allCategoryList[i];
        var _idCatName =  document.getElementById(_catName);
        try{
            if (searchCat == _catName || searchCat.length==0){
                _idCatName.style.display = "block";
            }else{
                _idCatName.style.display = "none";    
            }
        } catch(err){

        }
        
    } 
}


/**
 * Function will show category - product
 * @param {none}  
 */
function showProduct(catid){ 
    var _idFeaturePrd = document.getElementById("idFeatureProduct");
    if (_idFeaturePrd.style.display === "none") {
        _idFeaturePrd.style.display = "block";

        var _idFeatureProductDivider = document.getElementById("idFeatureProductDivider");
        _idFeatureProductDivider.style.display = "block";  
    }
    console.log(catid)
    getDataCall(catid);
}

/**
 * Function will get and populate feature product's for category
 * @param {none}  
 */

function getDataCall(catid){
    $('.owl-carousel').owlCarousel('destroy'); 
    $.ajax({url: "data/data.js", dataType:'json', success: function(result){
        var _idFeatureProductData =  document.getElementById("idFeatureProductData");
        $("#idFeatureProductData").empty();

        $(result).each(function(index,row){
            if (result[index]["name"] == catid){
                $(result[index]["data"]).each(function(ind,drow){
                    imgName = "/"+drow["img"];
                    pName = drow["name"];
                    pRating = drow["rating"];
                    pDesc = drow["desc"];
                    pPrice = drow["price"];
                    pId = drow["id"];
                    console.log("ind :" + ind + ": " + drow["id"] + " " + drow["name"] + " " + drow["desc"]);
                    pStarRated = getRatedStar(pRating);

                    $("#idFeatureProductData").append("<div style='width:220px; margnin:2px; padding:3px; border:1px solid rgba(0,0,0,.125);'><img width='205px' height='205px' src='"+imgSource+catid+imgName+"'/><div style='margin: 2px;  font-size: .98em;  background:#d2dbe9; padding:2px;  border:0px red solid;'><span style='margin-left:2px;padding:2px;color:#fff;'>"+pName+"</span><br/><span style='margin-left:2px;padding:2px;color:#fff;'>"+pPrice+"</span><br/>"+pStarRated+"<br/><a onclick='buynow("+pId+")' href='javascript:;' class='btn btn-primary'>Buy Now</a> <a onclick='view("+pId+")' href='javascript:;' class='btn btn-warning'>View</a> </div></div>");
                });
            }
        });

        setTimeout(function(){
            $(".owl-carousel").owlCarousel({
                center: true,
                items:2,
                loop:true,
                margin:5,
                dots:true,
                autoplay:true,
                //nav:true,
                //navText:["Prev","Next"],
                responsive:{
                    600:{
                        items:4
                    }
                } 
            });
        }, 300);
        //console.log(JSON.stringify(_tmpData));
    }});
}

/**
 *  Function to calculate product star given
 *  @param : (decimal_number) i.e. 5.0, 3.5, 2.5
 * */ 
function getRatedStar(ratedNumber){
    ratedNumber = String(ratedNumber);
    rateNumberArray = ratedNumber.split(".");
    ratedStr = "<div class=''>";
    var _isColorDone = false;
    var _isColorHalfDone = false;
    var _fullRated = rateNumberArray[0];
    var _color = '';
    for(i=0; i<5; i++){
        _starType = 'fa-star';
        _color = '';

        if ((i+1) < _fullRated){
            _color='sRed';
        }
        if (_fullRated == (i+1)){
            _isColorDone = true;
        }
        if (_isColorDone == true && rateNumberArray[1]>0 && _isColorHalfDone == false){
            _isColorHalfDone = true;
            _color='sRed';
            _starType = 'fa-star-half-o';
        }
        
        ratedStr=ratedStr+"<i class='fa fanew " + _starType + " " + _color + "' aria-hidden='true'></i>";
 
    }

    ratedStr=ratedStr+"</div>";
    return ratedStr;
}

/**
 * Function will view proudct to viewpage
 * @param {*} id 
 */
function view(id){
    _id = String(id);
    console.log(_id);
    myCartStorage.setItem('myCartId', _id);
    window.location = 'viewpage.html';
}


function getLoginName(){
    document.getElementById("idLoginName").innerHTML = myCartStorage.getItem('userLoginName');
    
}

/**
 * Function will add proudct to cart number
 * @param {*} id 
 */
function buynow(id){
    _id = String(id); 

    var _idCartItem = document.getElementById("idCartItem");
    var _tmp = parseInt(_idCartItem.innerHTML);
    var cartItemsAdded = [];
    try{
        cartItemsAdded = localStorage.getItem('myCartItems').split(",");
    }
    catch(err){

    }
    
    if (cartItemsAdded.indexOf(_id) == -1){
        cartItemsAdded.push(_id);
        myCartStorage.setItem('myCartItems', cartItemsAdded);
        _tmp = _tmp + 1;
    }

    // cartItemsAdded.push(_id);
    // _tmp = _tmp + 1;
    _idCartItem.innerHTML = _tmp;
}

/**
 * Function will update price * qty = amount for product
 * @param {none}  
 */
function updatenow(id, price){
    var _qtyItem = 0;
    var _amtItem = 0;
    var _id = String(id);
    try{
        _qtyItem = document.getElementById("addedProductQty_"+id).value;
        _amtItem = document.getElementById("addedAmtProduct_"+id).innerHTML;
    } catch(err){

    }
    
    if (_qtyItem == 0){
        var cartItemsAdded = [];
        var newCartItemsAdded = [];
        var _itemPosition = -1;
        try{
            cartItemsAdded = localStorage.getItem('myCartItems').split(",");
            // for (i=0; i < cartItemsAdded.length; i++){
            //     if (cartItemsAdded[i] != _id && newCartItemsAdded.indexOf(_id) < 0 ){
            //         newCartItemsAdded.push(_id);
            //     }
            // }
            var _index = cartItemsAdded.indexOf(_id);
            newCartItemsAdded = cartItemsAdded.splice(_index, 1);
            if (cartItemsAdded.length>0){
                myCartStorage.setItem('myCartItems', cartItemsAdded);
            }
            else{
                myCartStorage.clear();
            }
        }catch(err){
    
        }
        window.location.reload();
    }

    var _amt =0;
    try{
        _amt = parseFloat(price) * _qtyItem;
    } catch(err){

    }

    var _finalAmt = $("#idCartPaySummary").html();
    _finalAmt = parseFloat(_finalAmt - _amtItem); 
    _finalAmt = _finalAmt + _amt;
    $("#idCartPaySummary").html(_finalAmt);

    myCartStorage.setItem('myCartFinalAmount', _finalAmt);

    $("#addedAmtProduct_"+id).html(_amt);
}

/**
 * Function will price * qty = amount for product for all products
 * @param {none}  
 */
function updateSummary(){

}


/**
 * Function will price * qty = amount for product
 * @param {none}  
 */
function getPrice(id, price){
    var _amt =0;
    try{
        _amt = parseFloat(price) * 1;
    } catch(err){

    }
    return _amt;
}

/**
 * Function will redirect to cart page
 * @param {none}  
 */
function viewCart(){
    window.location = "viewcart.html"
}


/**
 * Function will show cart details
 * @param {none}  
 */
function getCartDetails(){ 
    var cartItemsAdded = [];

    try{
        cartItemsAdded = localStorage.getItem('myCartItems').split(",");
    }catch(err){

    }
    
    $.ajax({url: "data/data.js", dataType:'json', success: function(result){ 
        $("#idCartDetails").empty();
        var _finalAmt = 0;
        $(result).each(function(index,row){ 
            var _loopCatId = result[index]["name"];
            $(result[index]["data"]).each(function(ind,drow){
                imgName = "/"+drow["img"];
                pName = drow["name"];
                pRating = drow["rating"];
                pDesc = drow["desc"];
                pPrice = drow["price"];
                pId = String(drow["id"]);
                //console.log("ind :" + ind + ": " + drow["id"] + " " + drow["name"] + " " + drow["desc"]);
                pStarRated = getRatedStar(pRating);
                _tmpPrice = parseFloat(pPrice);
                pAmt= getPrice(pId,_tmpPrice);

                if (cartItemsAdded.indexOf(pId) >= 0){
                    _finalAmt = _finalAmt + _tmpPrice;
                    $("#idCartDetails").append("<div class='row container-fluid col-lg-12'><div class='viewCartProductBlock col-md-12'><div class='col-sm-3' style='float:left;'><img width='180px' height='180px' src='"+imgSource+_loopCatId+imgName+"'/></div><div class='viewCartProductAttrBlock col-md-8' style='float:left;'><span class='nameSize'>"+pName+"</span><br/><label>Description:</label><span>"+pDesc+"</span><br/><span class='priceSize'><label>Price:</label><label id='priceId_"+ pId +"' style='margin:5px;color:gray;'>"+pPrice+"</label></span><span class='idAddedQty'> X <label class='qtySize'>Qty</label>: <input type='text' name='addedProductQty_"+ pId +"' id='addedProductQty_"+ pId +"' value='1' class='form-control' style='width:50px;display:inline-block;' placeholder='0' /></span><span class='amountPriceQtySize'><label>Value: <span  id='addedAmtProduct_"+ pId +"'>"+ pAmt + "</span></label></span><br/><span style='border:0px;'><a onclick='view("+pId+")' href='javascript:;' class='btn btn-info'>View</a> | <a onclick='updatenow("+pId+", "+_tmpPrice+")' href='javascript:;' class='btn btn-primary'>Update</a></span></div></div></div>");
                }
            });
             
        }); 
        
        if (cartItemsAdded.length == 0){
            $("#idCartDetails").empty();
            _finalAmt = 0;
            $("#idCartDetails").append("<div class='row container-fluid col-lg-12'><h1>Your cart is empty! <i class='fa fa-shopping-cart cartEmptySize' ></i></h1></div><a class='btn btn-warning' href='index.html'>buy</a>");
        }

        $("#idCartPaySummary").html(_finalAmt);

    }});
    

}

/**
 * Function will show prodict detail
 * @param {none}  
 */
function getProductDetail(){ 
    var _productId = localStorage.getItem('myCartId');
    $.ajax({url: "data/data.js", dataType:'json', success: function(result){ 
        $("#idProductDetail").empty();

        $(result).each(function(index,row){ 
            var _loopCatId = result[index]["name"];
            $(result[index]["data"]).each(function(ind,drow){
                imgName = "/"+drow["img"];
                pName = drow["name"];
                pRating = drow["rating"];
                pDesc = drow["desc"];
                pPrice = drow["price"];
                pId = drow["id"];
                console.log("ind :" + ind + ": " + drow["id"] + " " + drow["name"] + " " + drow["desc"]);
                pStarRated = getRatedStar(pRating);

                if (_productId == pId ){
                    //$("#idProductDetail").append("<div class='row col-lg-8'><div class='viewProductBlock'><div class='col-sm-6'><img width='540px' height='540px' src='"+imgSource+_loopCatId+imgName+"'/></div><div class='col-sm-6'><div class='viewProductAttrBlock'><span class='nameSize'>"+pName+"</span><br/><span class='priceSize'><label>Price:</label>"+pPrice+"</span><br/><label>Description:</label><span>"+pDesc+"</span><br/><span>Rating: "+pStarRated+"</span><br/><span style='border:0px;'><a onclick='buynow("+pId+")' href='javascript:;' class='btn btn-primary'>Buy Now</a></span></div></div></div></div>"); //-- full page -- linear

                    $("#idProductDetail").append("<div class='row container-fluid col-lg-12'><div class='viewProductBlock col-md-12'><div class='col-md-5' style='float:left;'><img width='340px' height='340px' src='"+imgSource+_loopCatId+imgName+"'/></div><div class='viewProductAttrBlock col-md-5' style='float:left;'><span class='nameSize'>"+pName+"</span><br/><span class='priceSize'><label>Price:</label>"+pPrice+"</span><br/><label>Description:</label><span>"+pDesc+"</span><br/><span>Rating: "+pStarRated+"</span><br/><span style='border:0px;'><a onclick='buynow("+pId+")' href='javascript:;' class='btn btn-primary'>Buy Now</a></span></div></div></div>");
                }
            });
        }); 
    }});
}

function logOnConsole(_msg){
    console.log(_msg)
}

function loginNow(){ 
    var _statusLogin = '';
    var _emailId = document.getElementById("exampleInputEmail1").value;
    var _passData = document.getElementById("exampleInputPassword1").value;
    if (_emailId.length == 0 ){
        alert("Please enter email id ");
    } else if (_passData.length == 0 ){
        alert("Please enter password ");
    }
    else{
        _statusLogin = checkLoginDetails(_emailId, _passData);
    }
    if (_statusLogin == false){
        alert("User details not found");
    } else{
        alert("User login success");
        window.location = 'viewpay.html';
    }
    
}

function checkLoginDetails(_emailId, _passData){
    localStorage.setItem('userLoginName', '');
    var _userMasterData = [{'name':'','pass':'', 'email':''}];
    try{
        _userMasterData = localStorage.getItem('userMasterData');
    }catch(err){
        
    }
    _userMasterData = [JSON.parse(_userMasterData)];

    var _status = false;
    try{
        for (i=0; i< _userMasterData.length; i++){
            if (_userMasterData[i]['email'] == _emailId && _userMasterData[i]['pass'] == _passData ){ 
                localStorage.setItem('userLoginName', _userMasterData[i]['name']);
                _status = true;
                break;
            }
        }
    }catch(err){
            
    }

    logOnConsole(_userMasterData);

    return _status;
}



function registerNow(){ 
    var _statusLogin = '';
    
    var _nameId = document.getElementById("exampleInputName1").value;
    var _emailId = document.getElementById("exampleInputEmail2").value;
    var _passData = document.getElementById("exampleInputPassword1").value;

    if (_nameId.length == 0 ){
        alert("Please enter name ");
    } else if (_emailId.length == 0 ){
        alert("Please enter email id ");
    } else if (_passData.length == 0 ){
        alert("Please enter password ");
    }
    else{
        //_statusLogin = addRegisterData(_emailId, _passData); 
        var _tmpDataMasterData = [];
        try{
            _tmpDataMasterData = localStorage.setItem('userMasterData');
        }catch(err){

        }
        var _tmpData = {"name":_nameId, "email":_emailId, "pass":_passData};
        _tmpData = JSON.stringify(_tmpData);
        if (Array.isArray(_tmpDataMasterData)){
            _tmpDataMasterData.push(_tmpData);
        } else{
            var _tmpDataMasterData = [_tmpData];
        }
        
        localStorage.setItem('userMasterData', _tmpDataMasterData);
        localStorage.setItem('userLoginName', _nameId);
        window.location = 'viewpay.html';
    }
 
}
