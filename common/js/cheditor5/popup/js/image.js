// ================================================================
//                       CHEditor 5
// ----------------------------------------------------------------
// Homepage: http://www.chcode.com
// Copyright (c) 1997-2014 CHSOFT
// ================================================================
var UploadScript = "";
var DeleteScript = "";

var AppID = "chximage";
var AppSRC = "";
var activeImage = false;
var readyToMove = false;
var moveTimer = -1;
var dragDropDiv;
var insertionMarker;

var offsetX_marker = -4;
var offsetY_marker = -3;

var geckoOffsetX_marker = 4;
var geckoOffsetY_marker = -2;

var destinationObject = false;

var divXPositions = [];
var divYPositions = [];
var divWidth = [];
var divHeight = [];

var tmpLeft = 0;
var tmpTop = 0;

var eventDiff_x = 0;
var eventDiff_y = 0;

var modifyImages = [];
var uploadMaxNumber = 12;
var imageCompleted = 0;
var imageCompletedList = [];
var UploadButton = "";
var UploadImagePath = "";
var ShowThumbnailSize = { width: 120, height: 90 };
var oEditor = null;
var button;

var imageResizeWidth = 0;
var makeThumbnail = true;
var makeThumbnailWidth = 120;
var makeThumbnailHeight = 90;
var sortOnName = false;
var browser = null;

function createInsertionMaker() {

  /////////////////////////////
  console.log("createInsertionMaker");
  /////////////////////////////

  var wrapper = document.getElementById('insertionMarker');
  var topIco = new Image();
  topIco.src = UploadImagePath + '/marker_top.gif';
  topIco.style.width = '6px';
  topIco.style.height = '1px';
  wrapper.appendChild(topIco);

  var middleIco = new Image();
  middleIco.src = UploadImagePath + '/marker_middle.gif';
  middleIco.style.height = '96px';
  middleIco.style.width = '6px';
  wrapper.appendChild(middleIco);

  var bottomIco = new Image();
  bottomIco.src = UploadImagePath + '/marker_bottom.gif';
  bottomIco.style.width = '6px';
  bottomIco.style.height = '1px';
  wrapper.appendChild(bottomIco);
}

function popupClose() {

  /////////////////////////////
  console.log("popupClose");
  /////////////////////////////

  swfobject.removeSWF(AppID);
  oEditor.popupWinCancel();
}

function showContents() {

  /////////////////////////////
  console.log("showContents");
  /////////////////////////////

  var spacer = function (id) {
    var clear = document.createElement('div');
    clear.style.height = '0px';
    clear.style.width = '0px';
    clear.className = 'clear';
    clear.id = 'spacer' + id;

    if (browser.msie && browser.ver < 7) {
      clear.style.display = 'inline';
    }
    return clear;
  };

  var spacerNo = 1, i, imgBox, theImg, lastSpacer;
  for (i = 0; i < uploadMaxNumber; i++) {
    if (i > 0 && ((i % 4) === 0)) {
      document.getElementById('imageListWrapper').appendChild(spacer(spacerNo++));
    }

    imgBox = document.createElement('div');
    imgBox.id = 'imgBox' + i;
    imgBox.className = 'imageBox';
    theImg = document.createElement('div');
    theImg.id = 'img_' + i;
    theImg.className = 'imageBox_theImage';
    imgBox.appendChild(theImg);

    document.getElementById('imageListWrapper').appendChild(imgBox);
    if (i === (uploadMaxNumber - 1)) {
      lastSpacer = spacer(spacerNo);
      lastSpacer.style.height = "7px";
      document.getElementById('imageListWrapper').appendChild(lastSpacer);
    }
  }

  if (browser.msie && browser.ver < 7) {
    document.getElementById('imageListWrapper').style.padding = '5px 2px 5px 2px';
    document.getElementById('imageInfoBox').style.height = '302px';
    document.getElementById('imageInfoBox').style.width = '124px';
  }
  else {
    document.getElementById('imageListWrapper').style.padding = '5px 7px 0px 5px';
    document.getElementById('imageInfoBox').style.height = '298px';
    document.getElementById('imageInfoBox').style.width = '130px';
  }
}

function openFiles() {

  /////////////////////////////
  console.log("openFiles");
  /////////////////////////////

  var elem = browser.msie ? document.getElementById(AppID) : document[AppID];
  elem.AddFiles();
}

function setImageCount() {

  /////////////////////////////
  console.log("setImageCount");
  /////////////////////////////

  imageCompleted++;
  document.getElementById('imageCount').innerHTML = imageCompleted;
}

function getImageCount() {

  /////////////////////////////
  console.log("getImageCount");
  /////////////////////////////

  return imageCompleted;
}

function allowedMaxImage() {

  /////////////////////////////
  console.log("allowedMaxImage");
  /////////////////////////////

  return uploadMaxNumber - getImageCount();
}

function getUploadedCount() {

  /////////////////////////////
  console.log("getUploadedCount");
  /////////////////////////////

  return document.getElementById('imageListWrapper').getElementsByTagName('img').length;
}

function uploadedImageCount() {

  /////////////////////////////
  console.log("uploadedImageCount");
  /////////////////////////////

  imageCompleted = getUploadedCount();
  document.getElementById('imageCount').innerHTML = imageCompleted;
}

function uploadError(msg) {

  /////////////////////////////
  console.log("uploadError");
  /////////////////////////////

  alert(msg);
}

function imageDelete(filePath) {

  /////////////////////////////
  console.log("imageDelete");
  /////////////////////////////

  var chximage = document.getElementById(AppID);
  chximage.ImageDelete(encodeURI(filePath));
}

function getTopPos(inputObj) {

  /////////////////////////////
  console.log("getTopPos");
  /////////////////////////////

  var returnValue = inputObj.offsetTop;

  inputObj = inputObj.offsetParent;
  while (inputObj) {
    if (inputObj.tagName.toLowerCase() !== 'html') {
      returnValue += (inputObj.offsetTop - inputObj.scrollTop);
      if (browser.msie) {
        returnValue += inputObj.clientTop;
      }
    }
    inputObj = inputObj.offsetParent;
  }
  return returnValue;
}

function getLeftPos(inputObj) {

  /////////////////////////////
  console.log("getLeftPos");
  /////////////////////////////

  var returnValue = inputObj.offsetLeft;

  inputObj = inputObj.offsetParent;
  while (inputObj) {
    if (inputObj.id !== 'imageListWrapper') {
      returnValue += inputObj.offsetLeft;
      if (browser.msie) {
        returnValue += inputObj.clientLeft;
      }
    }
    inputObj = inputObj.offsetParent;
  }
  return returnValue;
}

function getDivCoordinates() {

  /////////////////////////////
  console.log("getDivCoordinates");
  /////////////////////////////

  var imgBox = document.getElementById('imageListWrapper').getElementsByTagName('DIV');
  var i;
  for (i = 0; i < imgBox.length; i++) {
    if ((imgBox[i].className === 'imageBox' || imgBox[i].className === 'imageBoxHighlighted') && imgBox[i].id) {
      divXPositions[imgBox[i].id] = getLeftPos(imgBox[i]);
      divYPositions[imgBox[i].id] = getTopPos(imgBox[i]);
      divWidth[imgBox[i].id] = imgBox[i].offsetWidth;
      divHeight[imgBox[i].id] = imgBox[i].offsetHeight;
    }
  }
}

function reOrder() {

  /////////////////////////////
  console.log("reOrder");
  /////////////////////////////

  var wrapper = document.getElementById('imageListWrapper');
  var imgBox = wrapper.getElementsByTagName('div');
  var imgNum = 0, i, spacer, breakline = [];

  for (i = 0; i < imgBox.length; i++) {
    if (imgBox[i].id.indexOf('imgBox') === -1) {
      continue;
    }

    imgBox[i].className = 'imageBox';
    imgBox[i].firstChild.className = 'imageBox_theImage';

    if (imgNum > 0 && (imgNum % 4) === 0) {
      breakline.push(imgBox[i].id);
    }

    imgNum++;
  }

  for (i = 0; i < breakline.length; i++) {
    spacer = document.getElementById('spacer' + (i + 1));
    if (i + 1 === breakline.length) {
      wrapper.appendChild(spacer);
    }
    else {
      wrapper.insertBefore(spacer, document.getElementById(breakline[i]));
    }
  }
}

function setImageInfo(id) {

  /////////////////////////////
  console.log("setImageInfo");
  /////////////////////////////

  if (!id) {
    document.getElementById('selectedImageWidth').innerHTML = 0;
    document.getElementById('selectedImageHeight').innerHTML = 0;
    document.getElementById('selectedImageName').innerHTML = "??????";
  }
  else {
    document.getElementById('selectedImageWidth').innerHTML = imageCompletedList[id]['width'];
    document.getElementById('selectedImageHeight').innerHTML = imageCompletedList[id]['height'];
    document.getElementById('selectedImageName').innerHTML = imageCompletedList[id]['origName'];
  }
}

function showDelete() {

  /////////////////////////////
  console.log("showDelete");
  /////////////////////////////

  getDivCoordinates();

  var self = this;
  var btn = document.getElementById('removeImageButton');

  self.className = 'imageBox_theImage_over';
  btn.style.left = (makeThumbnailWidth - parseInt(btn.style.width, 10) - 1) + 'px';
  btn.style.top = '-1px';

  self.appendChild(btn);
  btn.style.display = 'block';

  btn.onmouseover = function (ev) {
    ev = ev || window.event;
    ev.cancelBubble = true;
    this.style.display = 'block';
    setImageInfo(self.id);
    this.className = 'removeButton_over';
    self.className = 'imageBox_theImage_over';
  };

  btn.onmouseout = function () { this.className = 'removeButton'; };
  btn.onmousedown = function () {
    var images = self.getElementsByTagName('img');
    var i = 0;
    for (; i < images.length; i++) {
      self.removeChild(images[i]);
    }

    self.removeChild(self.firstChild);
    self.className = 'imageBox_theImage';

    if (self.parentNode.nextSibling && self.parentNode.nextSibling.id) {
      var wrapper = document.getElementById('imageListWrapper');
      var moveobj = self.parentNode.nextSibling;
      var target = self.parentNode;

      while (moveobj !== null) {
        if (moveobj.firstChild && !moveobj.firstChild.firstChild) {
          break;
        }
        if (/^spacer/.test(moveobj.id)) {
          moveobj = moveobj.nextSibling;
          continue;
        }
        wrapper.insertBefore(moveobj, target);
        moveobj = target.nextSibling;
      }
    }

    reOrder();
    uploadedImageCount();
    setImageInfo(0);
    this.style.display = 'none';
    document.body.appendChild(this);
    self.onmouseout = self.onmouseover = null;
  };
  setImageInfo(self.id);
}

function hideDelete(event) {

  /////////////////////////////
  console.log("hideDelete");
  /////////////////////////////

  document.getElementById('removeImageButton').style.display = 'none';
}

function startUpload(count) {

  /////////////////////////////
  console.log("startUpload_start");
  /////////////////////////////

  var el = document.getElementById('imageListWrapper').getElementsByTagName('div');
  var i, imgBox;
  for (i = 0; i < el.length; i++) {
    imgBox = el[i];
    if (imgBox.className !== 'imageBox_theImage') {
      continue;
    }

    if (count == 0) {
      break;
    }

    if (!imgBox.firstChild || imgBox.firstChild.tagName.toLowerCase() !== 'img') {
      imgBox.style.backgroundImage = "url('" + UploadImagePath + "/loader.gif')";
      count--;
    }
  }

  /////////////////////////////
  console.log("startUpload_end");
  /////////////////////////////

}

function fileFilterError(file) {

  /////////////////////////////
  console.log("fileFilterError");
  /////////////////////////////

  alert("???????????? '" + file + "' ????????? ????????? ??? ????????????.\n" +
    "gif, png, jpg, ?????? ????????? ????????? ??? ????????????.");
}

function imgComplete(img, imgSize, boxId) {

  /////////////////////////////
  console.log("imgComplete");
  /////////////////////////////

  img.setAttribute("border", 0);
  var resizeW, resizeH, M;

  if (imgSize.width > ShowThumbnailSize.width || imgSize.height > ShowThumbnailSize.height) {
    if (imgSize.width > imgSize.height) {
      resizeW = (imgSize.width > ShowThumbnailSize.width) ? ShowThumbnailSize.width : imgSize.width;
      resizeH = Math.round((imgSize.height * resizeW) / imgSize.width);
    }
    else {
      resizeH = (imgSize.height > ShowThumbnailSize.height) ? ShowThumbnailSize.height : imgSize.height;
      resizeW = Math.round((imgSize.width * resizeH) / imgSize.height);
    }

    if (resizeH > ShowThumbnailSize.height) {
      resizeH = (imgSize.height > ShowThumbnailSize.height) ? ShowThumbnailSize.height : imgSize.height;
      resizeW = Math.round((imgSize.width * resizeH) / imgSize.height);
    }

  }
  else {
    resizeW = imgSize.width;
    resizeH = imgSize.height;
  }

  img.style.width = resizeW - 2 + 'px';
  img.style.height = resizeH - 2 + 'px';
  img.style.margin = "1px";

  if (resizeW < ShowThumbnailSize.width) {
    M = ShowThumbnailSize.width - resizeW;
    img.style.marginLeft = Math.round(M / 2) + 'px';
  }

  if (resizeH < ShowThumbnailSize.height) {
    M = ShowThumbnailSize.height - resizeH;
    img.style.marginTop = Math.round(M / 2) + 'px';
  }

  var elem = document.getElementById(boxId);
  elem.style.backgroundImage = "url('" + UploadImagePath + "/dot.gif')";
  elem.onmouseover = showDelete;
  elem.onmouseout = function () {
    this.className = 'imageBox_theImage';
    setImageInfo(0);
    hideDelete();
  };

  setImageCount();
}

function uploadComplete(image) {

  /////////////////////////////
  console.log("uploadComplete");
  /////////////////////////////

  image.filePath = decodeURI(image.filePath);
  image.origName = decodeURI(image.origName);

  var el = document.getElementById('imageListWrapper').getElementsByTagName('div');
  var imgBox = null, tmpImg, i, imgInfo;
  var imgOnLoad = function () {
    imgInfo = {
      "width": image.width,
      "height": image.height,
      "fileSize": image.fileSize,
      "fileUrl": image.fileUrl,
      "fileName": image.fileName,
      "filePath": image.filePath,
      "origName": image.origName
    };

    imageCompletedList[imgBox.id] = imgInfo;
    imgComplete(this, imgInfo, imgBox.id);
  };

  for (i = 0; i < el.length; i++) {
    imgBox = el[i];
    if (imgBox.className !== 'imageBox_theImage') {
      continue;
    }

    if (!imgBox.firstChild || imgBox.firstChild.tagName.toLowerCase() !== 'img') {
      tmpImg = new Image();
      tmpImg.style.width = "0px";
      tmpImg.style.height = "0px";
      tmpImg.setAttribute("alt", image.origName);
      tmpImg.onload = imgOnLoad;
      tmpImg.src = image.fileUrl;
      imgBox.appendChild(tmpImg);
      break;
    }
  }
}

function showUploadWindow() {

  /////////////////////////////
  console.log("showUploadWindow");
  /////////////////////////////

  var uploadWindow = document.getElementById("uploadWindow");
  var uploadWindowWidth = 700;
  var winWidth;

  if (typeof window.innerWidth !== 'undefined') {
    winWidth = window.innerWidth;
  }
  else if (document.documentElement && typeof document.documentElement.clientWidth !== 'undefined'
    && document.documentElement.clientWidth !== 0) {
    winWidth = document.documentElement.clientWidth;
  }
  else if (document.body && typeof document.body.clientWidth !== 'undefined') {
    winWidth = document.body.clientWidth;
  }
  else {
    alert('?????? ??????????????? ???????????? ????????????.');
    return;
  }

  var left = winWidth / 2 - (uploadWindowWidth / 2) + 'px';

  uploadWindow.style.left = left;
  uploadWindow.style.display = "block";
  uploadWindow.style.width = uploadWindowWidth + 'px';

  if (modifyImages.length > 0) {
    var el = document.getElementById('imageListWrapper').getElementsByTagName('DIV');
    var i, j, imgBox, img;
    for (i = 0; i < modifyImages.length; i++) {
      if (i > 7) {
        break;
      }

      for (j = 0; j < el.length; j++) {
        imgBox = el[j];
        if (imgBox.className !== 'imageBox_theImage') {
          continue;
        }

        if (imgBox.firstChild && (imgBox.firstChild.src == modifyImages[i])) {
          break;
        }

        if (imgBox.firstChild === null) {
          img = new Image();
          img.src = modifyImages[i];
          img.border = 0;
          img.alt = '';
          img.style.width = '120px';
          img.style.height = '90px';
          imgBox.appendChild(img);
          break;
        }
      }
    }
  }
}

function removeImages() {

  /////////////////////////////
  console.log("removeImages");
  /////////////////////////////

  var images = [], i, j, theImage, img, remove;
  document.body.appendChild(document.getElementById('removeImageButton'));

  for (i = 0; i < uploadMaxNumber; i++) {
    theImage = document.getElementById('img_' + i);
    if (theImage.hasChildNodes() && theImage.firstChild.tagName.toLowerCase() === 'img') {
      images.push(theImage);
    }
  }

  for (i = 0; i < images.length; i++) {
    img = images[i];
    if (img.firstChild !== null) {
      oEditor.removeEvent(img, 'mouseover', showDelete);
      remove = img.getElementsByTagName('img');

      for (j = 0; j < remove.length; j++) {
        img.removeChild(remove[j]);
      }

      img.parentNode.className = 'imageBox';
      img.onmouseout = img.onmouseover = null;
    }
  }
  uploadedImageCount();
  imageCompletedList = [];
}

function removeImage() {

  /////////////////////////////
  console.log("removeImage");
  /////////////////////////////

  var i, theImage, found = false;

  for (i = 0; i < uploadMaxNumber; i++) {
    theImage = document.getElementById('img_' + i);
    if (theImage.hasChildNodes() && theImage.firstChild.tagName.toLowerCase() === 'img') {
      found = true;
      break;
    }
  }

  if (found) {
    if (!confirm('???????????? ????????? ????????????. ?????? ????????? ?????????????????????????')) {
      return false;
    }
    removeImages();
  }

  return true;
}

function closeWindow() {

  /////////////////////////////
  console.log("closeWindow");
  /////////////////////////////

  if (removeImage()) {
    popupClose();
  }
}

function cancelEvent() {

  /////////////////////////////
  console.log("cancelEvent");
  /////////////////////////////

  return false;
}

function startMoveTimer() {

  /////////////////////////////
  console.log("startMoveTimer");
  /////////////////////////////

  if (moveTimer >= 0 && moveTimer < 10) {
    moveTimer++;
    setTimeout('startMoveTimer()', 8);
  }

  if (moveTimer === 5) {
    getDivCoordinates();
    var subElements = dragDropDiv.getElementsByTagName('div');
    if (subElements.length > 0) {
      dragDropDiv.removeChild(subElements[0]);
    }

    dragDropDiv.style.display = 'block';
    var newDiv = activeImage.cloneNode(true);
    newDiv.className = 'imageBox';
    if (browser.msie && browser.ver < 9) {
      newDiv.style.filter = 'alpha(opacity=50)';
    }
    else {
      newDiv.style.opacity = 0.5;
    }

    newDiv.id = '';
    newDiv.style.padding = '2px';
    dragDropDiv.appendChild(newDiv);

    dragDropDiv.style.top = tmpTop + 'px';
    dragDropDiv.style.left = tmpLeft + 'px';
  }

  return false;
}

function selectImage(e) {

  /////////////////////////////
  console.log("selectImage");
  /////////////////////////////

  if (browser.msie) {
    e = event;
  }

  var el = this.parentNode.firstChild.firstChild;
  if (!el) {
    return;
  }

  var obj = this.parentNode;
  hideDelete();

  if (activeImage) {
    activeImage.className = 'imageBox';
  }

  obj.className = 'imageBoxHighlighted';
  activeImage = obj;
  readyToMove = true;
  moveTimer = 0;

  tmpLeft = e.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
  tmpTop = e.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop);

  startMoveTimer();
  return false;
}

function dragDropEnd() {

  /////////////////////////////
  console.log("dragDropEnd");
  /////////////////////////////

  readyToMove = false;
  moveTimer = -1;
  dragDropDiv.style.display = 'none';
  insertionMarker.style.display = 'none';

  if (destinationObject && destinationObject !== activeImage) {
    var parentObj = destinationObject.parentNode;
    var chkObj = destinationObject.previousSibling;
    var turn = false;

    if (chkObj === null) {
      chkObj = document.getElementById('imageListWrapper').firstChild;
      turn = true;
    }

    if (chkObj.id.indexOf('spacer') !== -1) {
      chkObj = chkObj.previousSibling;
    }

    if (chkObj.firstChild.firstChild === null) {
      reOrder();
      return;
    }

    if (chkObj && chkObj.id !== null) {
      while (chkObj) {
        if (chkObj.firstChild.firstChild !== null) {
          break;
        }
        chkObj = chkObj.previousSibling;
      }
      destinationObject = turn ? chkObj : chkObj.nextSibling;
    }

    parentObj.insertBefore(activeImage, destinationObject);
    reOrder();

    activeImage.className = 'imageBox';
    activeImage = false;
    destinationObject = false;
    getDivCoordinates();
    return false;
  }
  return true;
}

function dragDropMove(e) {

  /////////////////////////////
  console.log("dragDropMove");
  /////////////////////////////

  if (moveTimer === -1) {
    return;
  }

  if (browser.msie) {
    e = window.event;
  }

  var leftPos = e.clientX + document.documentElement.scrollLeft - eventDiff_x;
  var topPos = e.clientY + document.documentElement.scrollTop - eventDiff_y;
  dragDropDiv.style.top = topPos + 'px';
  dragDropDiv.style.left = leftPos + 'px';

  leftPos = leftPos + eventDiff_x;
  topPos = topPos + eventDiff_y;

  if (e.button !== 1 && browser.msie) {
    dragDropEnd();
  }

  var elementFound = false, prop, offsetX, offsetY;

  for (prop in divXPositions) {
    if (divXPositions[prop].className === 'clear') {
      continue;
    }

    if (divXPositions[prop] < leftPos &&
      (divXPositions[prop] + divWidth[prop] * 0.7) > leftPos &&
      divYPositions[prop] < topPos &&
      (divYPositions[prop] + divWidth[prop]) > topPos) {
      if (browser.msie) {
        offsetX = offsetX_marker;
        offsetY = offsetY_marker;
      }
      else {
        offsetX = geckoOffsetX_marker;
        offsetY = geckoOffsetY_marker;
      }

      insertionMarker.style.top = divYPositions[prop] + offsetY + 'px';
      insertionMarker.style.left = divXPositions[prop] + offsetX + 'px';
      insertionMarker.style.display = 'block';
      destinationObject = document.getElementById(prop);
      elementFound = true;
      break;
    }
  }

  if (!elementFound) {
    insertionMarker.style.display = 'none';
    destinationObject = false;
  }

  return false;
}

function saveImageOrder() {

  /////////////////////////////
  console.log("saveImageOrder");
  /////////////////////////////

  var rData = [];
  var objects = document.getElementById('imageListWrapper').getElementsByTagName('DIV');
  var i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].className === 'imageBox' ||
      objects[i].className === 'imageBoxHighlighted') {
      rData.push(objects[i].id);
    }
  }

  return rData;
}

function initGallery() {

  /////////////////////////////
  console.log("initGallery");
  /////////////////////////////

  var imgBox = document.getElementById('imageListWrapper').getElementsByTagName('DIV');
  var i;
  for (i = 0; i < imgBox.length; i++) {
    if (imgBox[i].className === 'imageBox_theImage') {
      imgBox[i].onmousedown = selectImage;
    }
  }

  document.body.onselectstart = cancelEvent;
  document.body.ondragstart = cancelEvent;
  document.body.onmouseup = dragDropEnd;
  document.body.onmousemove = dragDropMove;

  dragDropDiv = document.getElementById('dragDropContent');
  insertionMarker = document.getElementById('insertionMarker');
  getDivCoordinates();
}

function doSubmit() {

  /////////////////////////////
  console.log("doSubmit");
  /////////////////////////////

  var el = document.getElementById('imageListWrapper').getElementsByTagName('DIV');
  var imageArray = [];
  var num = 0;
  var elem = document.getElementById('id_alignment').elements;
  var imgParagraph = false;
  var useSpacer = false;
  var imgAlign = 'top', i, imgBox;
  var input;

  for (i = 0; i < elem.length; i++) {
    input = elem[i];
    switch (input.name) {
      case "alignment":
        if (input.checked) {
          imgAlign = input.value;
        }
        break;
      case "para":
        imgParagraph = input.checked;
        break;
      case "use_spacer":
        useSpacer = input.checked;
        break;
    }
  }

  for (i = 0; i < el.length; i++) {
    imgBox = el[i];
    if (imgBox.className !== 'imageBox_theImage') {
      continue;
    }

    if (imgBox.firstChild !== null) {
      imageArray[num] = imageCompletedList[imgBox.id];

      if (imgAlign === 'break') {
        imageArray[num]['alt'] = "break";
      }
      else {
        imageArray[num]['alt'] = "";
        imageArray[num]['align'] = imgAlign;
      }

      num++;
    }
  }

  if (imageArray.length > 0) {
    oEditor.doInsertImage(imageArray, imgParagraph, useSpacer);
  }

  swfobject.removeSWF(AppID);
  oEditor.popupWinClose();
}

function initEvent() {

  /////////////////////////////
  console.log("initEvent");
  /////////////////////////////

  var swfVersionStr = "11.1.0";
  var xiSwfUrlStr = "http://get.adobe.com/kr/flashplayer/";
  var flashvars = {
    "UploadScript": UploadScript,
    "DeleteScript": DeleteScript,
    "UploadButton": UploadButton,
    "MakeThumbnail": makeThumbnail,
    "ThumbnailWidth": makeThumbnailWidth,
    "ThumbnailHeight": makeThumbnailHeight,
    "ImageResizeWidth": imageResizeWidth,
    "loadPolicyFile": true,
    "SortOnName": sortOnName
  };
  var params = {
    "quality": "high",
    "bgcolor": "#ffffff",
    "allowscriptaccess": "Always",
    "allowfullscreen": "false",
    //"allowNetworking": "all",
    "wmode": "transparent"
  };
  var attributes = { "id": AppID, "name": AppID, "align": "middle" };
  swfobject.embedSWF(AppSRC, "oFlashButton", "93", "22", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);

}

function init(dialog) {

  /////////////////////////////
  console.log("init");
  /////////////////////////////

  oEditor = this;
  oEditor.dialog = dialog;
  var dlg = new Dialog(oEditor);
  browser = oEditor.getBrowser();

  UploadImagePath = oEditor.config.iconPath + 'imageUpload';
  UploadButton = '../icons/imageUpload/add.gif';
  AppSRC = oEditor.config.popupPath + 'flash/chximage.swf';
  uploadMaxNumber = oEditor.config.imgUploadNumber;
  UploadScript = oEditor.config.editorPath + 'imageUpload/upload.aspx';
  DeleteScript = oEditor.config.editorPath + 'imageUpload/delete.aspx';

  imageResizeWidth = oEditor.config.imgMaxWidth;
  makeThumbnail = oEditor.config.makeThumbnail;
  sortOnName = oEditor.config.imgUploadSortName;
  makeThumbnailWidth = oEditor.config.thumbnailWidth;
  makeThumbnailHeight = oEditor.config.thumbnailHeight;

  document.getElementById("maxImageNum").appendChild(document.createTextNode(uploadMaxNumber));

  button = [{ alt: "", img: 'submit.gif', cmd: doSubmit, hspace: 2 },
  { alt: "", img: 'cancel.gif', cmd: closeWindow, hspace: 2 }];

  dlg.setDialogHeight(370);
  dlg.showButton(button);
  showContents();
  initGallery();
  showUploadWindow();
  initEvent();
  createInsertionMaker();

  var align = document.getElementById('fm_alignment');
  var i;
  for (i = 0; i < align.length; i++) {
    if (align[i].value === oEditor.config.imgDefaultAlign) {
      align[i].checked = "checked";
      break;
    }
  }
}