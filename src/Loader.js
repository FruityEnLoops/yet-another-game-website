export {showLoader, hideLoader};

function showLoader(){
	document.querySelector(".loader").classList.add("display");
	document.querySelector(".pageContainer").classList.add("blur");
}

function hideLoader(){
	document.querySelector(".loader").classList.remove("display");
	document.querySelector(".pageContainer").classList.remove("blur");
}