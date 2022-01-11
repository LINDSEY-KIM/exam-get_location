(function(){

    const button = document.querySelector("button");

    button.addEventListener("click", () => {
        if(navigator.geolocation){
            button.innerText = "Allow to detect location";
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }else{
            button.innerText = "Your browser not support";
        }
    });

    function onSuccess(position){
        button.innerText = "Detecting your location...";
        let {latitude, longitude} = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
        .then(response => response.json()).then(result => {
            let allDetails = result.result[0].components;
            let {county, postcode, country} = allDetails;
            // console.log(county, postcode, country)
            button.innerText = `${county} ${postcode}, ${country}`;
            console.table(allDetails);
        }).catch(()=>{
            button.innerText = "Something went wrong";
        })
    }

    function onError(error){
        if(error.code == 1){
            button.innerText = "You denied the request";
        }else if(error.code == 2){
            button.innerText = "Location not available";
        }else{
            button.innerText = "Something went wrong";
        }
        button.setAttribute("disabled", "true");
    }

})();