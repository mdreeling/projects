// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64 encoded image data
	// console.log(imageData);

	// Get image handle
	//
	if(!app.capturingSerial) {
		console.log("capturing equipment!")
		var smallImage = document.getElementById('smallImage');
		// Unhide image elements
		//
		smallImage.style.display = 'block';
		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	} else {
		console.log("capturing serial!")
		var smallImageSer = document.getElementById('smallImageSerial');
		// Unhide image elements
		//
		smallImageSer.style.display = 'block';
		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		smallImageSer.src = "data:image/jpeg;base64," + imageData;
	}

	if(!app.capturingSerial) {
		app.currentCapturedImageData = imageData;
	} else {
		app.currentCapturedSerialNoImageData = imageData;
	}
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);

	// Get image handle
	//
	var largeImage = document.getElementById('largeImage');

	// Unhide image elements
	//
	largeImage.style.display = 'block';

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : destinationType.DATA_URL,
		targetWidth : 640,
		targetHeight : 480
	});
}

// A button will call this function
//
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 20,
		allowEdit : true,
		destinationType : destinationType.DATA_URL
	});
}

// A button will call this function
//
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality : 50,
		destinationType : destinationType.FILE_URI,
		sourceType : source
	});
}

// Called if something bad happens.
//
function onFail(message) {
	alert('Failed because: ' + message);
}