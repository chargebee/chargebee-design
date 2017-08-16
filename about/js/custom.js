var ParallaxModel = (function() {
    var windowSize, wh, data, checkpoint0, checkpoint1, checkpoint2, checkpoint3, checkpoint4, prevPhotoBox, breakPoint1, breakPoint2, breakPoint3, breakPoint4, breakPoint5;
    breakPoint1 = breakPoint2 = breakPoint3 = breakPoint4 = breakPoint5 = false;
    var percentage = function(percent, total) { 
        return (percent / 100) * total;
    }
    var recalculateWidth = function() {
        var layer, layerWidth;
        var textlayer = document.querySelectorAll("#text-layer")[0];
        textlayer.children[0].style.width = document.querySelectorAll(".layer3")[0].children[0].clientWidth + "px";
        var layers = document.querySelectorAll(".image-container__layer");
        var constantLayerWidth = layers[1].children[0].clientWidth - windowSize;
        for (var i = 2; i < layers.length; i++) {
            var speed;
            layer = layers[i];
            layer.style.width = layer.children[0].clientWidth + "px";
            layerWidth = layer.children[0].clientWidth - windowSize;
            speed = layerWidth / constantLayerWidth;
            if (speed)
                layer.setAttribute('data-speed', speed);

        }
        speed = document.querySelectorAll(".layer3")[0].getAttribute("data-speed");
        if (speed) {
            textlayer.setAttribute('data-speed', speed);
        }
        var layerWidth = textlayer.clientWidth;
        checkpoint0 = percentage(10, layerWidth);
        checkpoint1 = percentage(41, layerWidth);
        checkpoint2 = percentage(57, layerWidth);
        checkpoint3 = percentage(77, layerWidth);
        checkpoint4 = percentage(89, layerWidth);
    }
    var init = function() {
        windowSize = window.innerWidth;
        wh = window.innerHeight;
        var layerContainer = document.querySelectorAll("#image-container")[0];
        var fixedContainer = document.querySelectorAll("#fixed")[0];
        layerContainer.style.height = wh + "px";
        fixedContainer.style.height = wh + "px";
        fixedContainer.style.width = windowSize + "px";
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if (isAndroid && (windowSize < 380)) {
            fixedContainer.scrollLeft = 300;
        }

    }
    var breakPointArrived = function(breakPoint) {
        ga('send', 'event', 'website', 'about-scroll', breakPoint);
    }

    var castParallax = function() {
        var scroll = document.querySelectorAll("#fixed")[0];
        scroll.addEventListener("scroll", function(event) {
            var j = 0;
            var left = (scroll.scrollLeft / 4);
            var layers = document.querySelectorAll(".image-container__layer");
            for (var i = 1; i < layers.length; i++) {
                layer = layers[i];
                speed = layer.getAttribute('data-speed');
                width = layer.children[0].clientWidth - windowSize;
                xPos = (left * speed);
                if (i == 3) {
                    if (xPos > (checkpoint0 - (windowSize / 2) - 100) && xPos < (checkpoint0 - (windowSize / 2)) + 400) {
                        if (!breakPoint1) {
                            breakPointArrived("10%");
                            breakPoint1 = true;
                        }
                    }
                    if (xPos > (checkpoint1 - (windowSize / 2) - 100) && xPos < (checkpoint1 - (windowSize / 2)) + 400) {
                        if (!breakPoint2) {
                            breakPointArrived("41%");
                            breakPoint2 = true;
                        }
                        document.querySelectorAll(".text-point1")[0].style.display = "block";
                        document.querySelectorAll(".check-point2")[0].classList.add("bounce");
                    } else {
                        document.querySelectorAll(".check-point2")[0].classList.remove("bounce");
                        document.querySelectorAll(".text-point1")[0].style.display = "none";
                    }
                    if (xPos > (checkpoint2 - (windowSize / 2)) && xPos < (checkpoint2 - (windowSize / 2)) + 400) {
                        if (!breakPoint3) {
                            breakPointArrived("57%");
                            breakPoint3 = true;
                        }
                        document.querySelectorAll(".check-point3")[0].classList.add("bounce");
                        document.querySelectorAll(".text-point2")[0].style.display = "block";
                    } else {
                        document.querySelectorAll(".check-point3")[0].classList.remove("bounce");
                        document.querySelectorAll(".text-point2")[0].style.display = "none";
                    }
                    if (xPos > (checkpoint3 - (windowSize / 2)) && xPos < (checkpoint3 - (windowSize / 2)) + 400) {
                        if (!breakPoint4) {
                            breakPointArrived("77%");
                            breakPoint4 = true;
                        }
                        document.querySelectorAll(".check-point4")[0].classList.add("bounce");
                        document.querySelectorAll(".text-point3")[0].style.display = "block";
                    } else {
                        document.querySelectorAll(".check-point4")[0].classList.remove("bounce");
                        document.querySelectorAll(".text-point3")[0].style.display = "none";
                    }
                    if (xPos > (checkpoint4 - (windowSize / 2)) && xPos < (checkpoint4 - (windowSize / 2)) + 400) {
                        if (!breakPoint5) {
                            breakPointArrived("89%");
                            breakPoint5 = true;
                        }
                        document.querySelectorAll(".check-point5")[0].classList.add("bounce");
                        document.querySelectorAll(".text-point4")[0].style.display = "block";
                    } else {
                        document.querySelectorAll(".check-point5")[0].classList.remove("bounce");
                        document.querySelectorAll(".text-point4")[0].style.display = "none";
                    }
                }
                if ((xPos) < width) {
                    xPos = -xPos;
                    layer.style.left = xPos + "px";
                } else {
                    ++j;
                    if (j == 5) {
                        var scrollableContainer = document.querySelectorAll("#fixed")[0];
                        var scrollableDiv = document.querySelectorAll("#fixed .scrollable-div")[0];
                        scrollableDiv.style.width = scrollableContainer.scrollLeft + windowSize + "px";
                    }
                }
            }
        });
    }
    var startSite = function() {
        init();
        recalculateWidth();
        castParallax();
    }

    function setRowNum(element, rowNum) {
        element.setAttribute("data-row", rowNum);
    }

    function setColumnNum(element, colNum) {
        element.setAttribute("data-col", colNum);
    }

    function moveLeft(element, flag) {
        var left = element.offsetLeft;
        if (flag) {
            left = left - 160;
        } else {
            left = left - 70;
        }
        element.style.left = left + "px";
    }

    function moveRight(element) {
        var left = element.offsetLeft;
        element.style.left = left + 50 + "px";
    }

    function moveElements(elementsArray, position, flag) {
        for (var i = 0; i < position && i < elementsArray.length; i++) {
            moveLeft(elementsArray[i], flag);
        }
        for (var j = position; j < elementsArray.length; j++) {
            moveRight(elementsArray[j]);
        }
    }

    function revertMoveLeft(element, flag) {
        var left = element.offsetLeft;
        if (flag) {
            left = left + 160;
        } else {
            left = left + 70;
        }
        element.style.left = left + "px";
    }

    function revertMoveRight(element) {
        var left = element.offsetLeft;
        element.style.left = left - 50 + "px";
    }

    function revertElements(elementsArray, position, flag) {
        for (var i = 0; i < position && i < elementsArray.length; i++) {
            revertMoveLeft(elementsArray[i], flag);
        }
        for (var j = position; j < elementsArray.length; j++) {
            revertMoveRight(elementsArray[j]);
        }
    }
    var scalePhoto = function(photoBox) {
        document.querySelectorAll("#tile-wall")[0].classList.add("disable-click");
        photoBox = photoBox.parentElement;
        var prevFlag = true;
        var currrentCol, currentRow, currentRowElements, nextRowElements, prevRowElements;
        var temp = document.querySelectorAll(".expand")[0];
        if (temp != undefined) {
            prevFlag = false;
            temp.classList.remove("expand");
            currrentCol = temp.getAttribute("data-col");
            currentRow = temp.getAttribute("data-row");
            currentRow = parseInt(currentRow);
            currentRowElements = document.querySelectorAll("[data-row='" + currentRow + "']");
            revertElements(currentRowElements, currrentCol, false);
            // change top position
            if (currrentCol != 1)
                temp.style.top = currentRowElements[0].offsetTop + "px";
            else
                temp.style.top = currentRowElements[1].offsetTop + "px";
            //Except last row
            if ((currentRow + 1) < totalRowCount) {
                nextRowElements = document.querySelectorAll("[data-row='" + (currentRow + 1) + "']");
                revertElements(nextRowElements, currrentCol, true);
            } else {
                // if element in lasst row is clicked
                prevRowElements = document.querySelectorAll("[data-row='" + (currentRow - 1) + "']");
                revertElements(prevRowElements, currrentCol, true);
            }
        }
        if (prevPhotoBox != photoBox || prevFlag) {
            setTimeout(function() {
                currrentCol = photoBox.getAttribute("data-col");
                currentRow = photoBox.getAttribute("data-row");
                currentRow = parseInt(currentRow);
                photoBox.classList.add("expand");
                currentRowElements = document.querySelectorAll("[data-row='" + currentRow + "']");
                moveElements(currentRowElements, currrentCol, false);
                //Except last row
                if ((currentRow + 1) < totalRowCount) {
                    nextRowElements = document.querySelectorAll("[data-row='" + (currentRow + 1) + "']");
                    moveElements(nextRowElements, currrentCol, true);
                } else {
                    // if element in lasst row is clicked
                    prevRowElements = document.querySelectorAll("[data-row='" + (currentRow - 1) + "']");
                    moveElements(prevRowElements, currrentCol, true);
                    // change top position
                    photoBox.style.top = prevRowElements[0].offsetTop + "px";
                }
                setTimeout(function() {
                    document.querySelectorAll("#tile-wall")[0].classList.remove("disable-click");
                }, 200);
            }, 200);
        } else {
            setTimeout(function() {
                document.querySelectorAll("#tile-wall")[0].classList.remove("disable-click");
            }, 200);
        }
        prevPhotoBox = photoBox;
    }
    var totalRowCount, totalColumnCount;

    var calulatePosition = function() {
        var marginLeft, marginTop, wallSize, tileWidth, tileHeight, left, top, rowNum, colNum, colLimit, flag, j;
        marginLeft = 30, marginTop = 90, tileWidth = 70, tileHeight = 80, left = 0, top = 0, totalRowCount = 0, totalColumnCount = 0;
        rowNum = 0, colNum = 0, flag = false, j = 0;
        wallSize = document.querySelectorAll("#tile-wall")[0].clientWidth;
        var tiles = document.querySelectorAll(".wall-wrapper__photo-bg");
        if (wallSize && wallSize > 0) {
            for (var i = 0; i < tiles.length; i++) {
                if ((left + (tileWidth * 2) + marginLeft) < wallSize) {
                    left = (j * tileWidth) + (j * marginLeft);
                    j++;
                    colNum++;
                    tiles[i].style.left = left + "px";
                    tiles[i].style.top = top + "px";
                    setRowNum(tiles[i], rowNum);
                    setColumnNum(tiles[i], colNum);
                } else {
                    flag = true;
                    colLimit = colNum;
                    colNum = 0;
                    left = 0;
                    j = 0;
                    i = i - 1;
                    rowNum++;
                    top = (tileHeight * rowNum) + (rowNum * marginTop);
                }
            }
        }
        totalRowCount = rowNum + 1;
        totalColumnCount = colLimit;
        document.querySelectorAll("#tile-wall")[0].style.height = top + 170 + "px";
    }
    var removeFixedFunctionality = function() {
            var fixedLayer = document.querySelectorAll(".layer1")[0];
            fixedLayer.style.position = "absolute";
            document.querySelectorAll("body")[0].style.overflow = "auto";
        }
        /* Move layers to top */
    var translateLayers = function() {
        var imageContainer = document.querySelectorAll("#image-container")[0];
        var layers = document.querySelectorAll(".image-container__layer");
        var length = layers.length;
        for (var i = 1; i < length; i++) {
            layer = layers[i];
            layer.style.transform = "translateY(-" + (imageContainer.style.height) + ")";
            if (i < (length - 3))
                layer.style.transitionDelay = ((length - 2 - i) * 0.1) + "s";
            else
                layer.style.transitionDelay = "0.25s";
        }
    }
    var setBodyProperty = function(height) {
        var body = document.querySelectorAll("body")[0];
        body.style.overflow = "auto";
        body.style.height = height + "px";
    }
    var revertBodyProperty = function(height) {
        var body = document.querySelectorAll("body")[0];
        body.style.overflow = "hidden";
        body.style.height = "auto";
    }
    var showTeam = function() {
        //hide image container
        var teamWrapper = document.querySelectorAll("#team-wrapper")[0];
        var imageContainer = document.querySelectorAll("#image-container")[0];
        teamWrapper = document.querySelectorAll("#team-wrapper")[0];
        teamWrapper.classList.remove("hidden");
        // translate image container to top
        translateLayers();
        // Make the team wrapper visible
        teamWrapper.classList.remove("visibility");
        teamWrapper.style.transform = "translateY(-" + (imageContainer.style.height) + ")";
        teamWrapper.style.transitionDelay = "0.25s";
        // remove overflow hidden property from body
        setBodyProperty(teamWrapper.clientHeight);
    }
    var showBoard = function() {
        //hide image container
        var teamWrapper = document.querySelectorAll("#team-wrapper")[0];
        var boardWrapper = document.querySelectorAll("#board-of-directors")[0];
        var imageContainer = document.querySelectorAll("#image-container")[0];
        // Make the borad wrapper visible
        boardWrapper.classList.remove("hidden");
        // translate image container to top
        translateLayers();
        teamWrapper.classList.add("hidden");
        boardWrapper.style.transform = "translateY(-" + (imageContainer.clientHeight) + "px)";
        boardWrapper.style.transitionDelay = "0.25s";
        // remove overflow hidden property from body
        setBodyProperty(boardWrapper.clientHeight);

    }
    var translateLayersBack = function() {
        var layers = document.querySelectorAll(".image-container__layer");
        for (var i = 1; i < layers.length; i++) {
            layer = layers[i];
            layer.style.transform = "translateY(0px)";
            if (i < (layers.length - 2))
                layer.style.transitionDelay = ((i) * 0.05) + "s";
            else
                layer.style.transitionDelay = ".1s";
        }
    }
    var animateContentLayersBack = function(wrapper, classToBeAdded) {
        var imageContainer = document.querySelectorAll("#image-container")[0];
        translateLayersBack();
        wrapper.style.transform = "translateY(0px)";
        wrapper.style.transitionDelay = "0.1s";
        setTimeout(function() {
            wrapper.classList.add(classToBeAdded);
        }, 1500);
        revertBodyProperty();
    }
    var animateToTop = function() {
        var teamWrapper = document.querySelectorAll("#team-wrapper")[0];
        animateContentLayersBack(teamWrapper, "visibility");
    }
    var animateToTopFromBoard = function() {
        var boardWrapper = document.querySelectorAll("#board-of-directors")[0];
        animateContentLayersBack(boardWrapper, "hidden");
        var teamWrapper = document.querySelectorAll("#team-wrapper")[0];
        setTimeout(function() {
            teamWrapper.classList.remove("hidden");
        }, 1500);
    }
    var readTextFile = function(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    var setPhoto = function() {
        var tile = document.querySelectorAll("#tile-wall")[0];
        readTextFile("/about/json/team.json", function(text) {
            data = JSON.parse(text);
            var teamArray = data.team.sort(function(a, b) {
                return Math.random() - 0.5;
            });
            for (var i = 0; i < teamArray.length; i++) {
                var wrapper = document.createElement("div");
                wrapper.classList.add("wall-wrapper__photo-bg");
                var photo = document.createElement("div");
                photo.classList.add("wall-wrapper__photo");
                var image = document.createElement("img");
                image.setAttribute("src", teamArray[i].img);
                image.classList.add("normal");
                var funny = document.createElement("img");
                funny.setAttribute("src", teamArray[i].funnyImg);
                funny.classList.add("funny");
                var text = document.createElement("p");
                text.classList.add("funny-text");
                text.innerHTML = teamArray[i].text;
                var div = document.createElement("div");
                div.classList.add("employee-data");
                if (teamArray[i].twitterHandle && teamArray[i].twitterHandle != "") {
                    var link = document.createElement("a");
                    link.setAttribute("href", teamArray[i].twitterHandle);
                    link.setAttribute("target", "new");
                    div.appendChild(link);
                }
                var span = document.createElement("span");
                span.innerHTML = teamArray[i].name;
                div.appendChild(span);
                photo.appendChild(image);
                photo.appendChild(funny);
                wrapper.appendChild(photo);
                wrapper.appendChild(text);
                wrapper.appendChild(div);
                tile.appendChild(wrapper);
            }
            calulatePosition();
            var boxes = document.querySelectorAll(".wall-wrapper__photo-bg .wall-wrapper__photo");
            for (var i = boxes.length - 1; i >= 0; i--) {
                boxes[i].addEventListener("click", function(event) {
                    ParallaxModel.scalePhoto(this);
                })
            }
            // ParallaxModel.scalePhoto(boxes[16]);
        });
    }
    var showExternalLinkJobs = function() {
        document.querySelectorAll(".job-link")[0].style.opacity = 1;
        document.querySelectorAll(".job-link")[0].style.width = "auto";
    }
    var showExternalLinkCustomers = function() {
        document.querySelectorAll(".customer-link")[0].style.opacity = 1;
    }
    var hideExternalLinkJobs = function() {
        document.querySelectorAll(".job-link")[0].style.opacity = 0;
        document.querySelectorAll(".job-link")[0].style.width = "0";
    }
    var hideExternalLinkCustomers = function() {
        document.querySelectorAll(".customer-link")[0].style.opacity = 0;
    }
    var showAngleDownShadow = function(temp) {
        document.getElementById(temp).classList.add("shadow");
    }
    var hideAngleDownShadow = function(temp) {
        document.getElementById(temp).classList.remove("shadow");
    }
    return {
        startSite: startSite,
        recalculateWidth: recalculateWidth,
        setPhoto: setPhoto,
        calulatePosition: calulatePosition,
        scalePhoto: scalePhoto,
        showTeam: showTeam,
        animateToTop: animateToTop,
        animateToTopFromBoard: animateToTopFromBoard,
        showBoard: showBoard,
        showExternalLinkCustomers: showExternalLinkCustomers,
        showExternalLinkJobs: showExternalLinkJobs,
        hideExternalLinkJobs: hideExternalLinkJobs,
        hideExternalLinkCustomers: hideExternalLinkCustomers,
        showAngleDownShadow: showAngleDownShadow,
        hideAngleDownShadow: hideAngleDownShadow
    }
})();

window.onload = function() {
    if (document.readyState === 'complete') {
        var loader = document.querySelectorAll("#loader")[0].style.display = "none";
        ParallaxModel.startSite();
        ParallaxModel.setPhoto();

        document.querySelectorAll("#show-team")[0].addEventListener("click", function(event) {
            ParallaxModel.showTeam();
        });
        document.querySelectorAll("#show-board")[0].addEventListener("click", function(event) {
            ParallaxModel.showBoard();
        });
        document.querySelectorAll("#team-wrapper-back")[0].addEventListener("click", function(event) {
            ParallaxModel.animateToTop();
        });
        document.querySelectorAll("#board-back")[0].addEventListener("click", function(event) {
            ParallaxModel.animateToTopFromBoard();
        });
        document.querySelectorAll(".text-point3")[0].addEventListener("mouseenter", function(event) {
            ParallaxModel.showExternalLinkCustomers();
        });
        document.querySelectorAll(".text-point4")[0].addEventListener("mouseenter", function(event) {
            ParallaxModel.showExternalLinkJobs();
        });
        document.querySelectorAll(".text-point3")[0].addEventListener("mouseleave", function(event) {
            ParallaxModel.hideExternalLinkCustomers();
        });
        document.querySelectorAll(".text-point4")[0].addEventListener("mouseleave", function(event) {
            ParallaxModel.hideExternalLinkJobs();
        });
        document.querySelectorAll(".text-point1")[0].addEventListener("mouseenter", function(event) {
            ParallaxModel.showAngleDownShadow("team-arrow");
        });
        document.querySelectorAll(".text-point1")[0].addEventListener("mouseleave", function(event) {
            ParallaxModel.hideAngleDownShadow("team-arrow");
        });
        document.querySelectorAll(".text-point2")[0].addEventListener("mouseenter", function(event) {
            ParallaxModel.showAngleDownShadow("board-arrow");
        });
        document.querySelectorAll(".text-point2")[0].addEventListener("mouseleave", function(event) {
            ParallaxModel.hideAngleDownShadow("board-arrow");
        });

    }
}
var resizeId;
window.onresize = function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
    var temp = document.querySelectorAll(".expand")[0];
    if (temp != undefined) {
        temp.classList.remove("expand");
    }
    var scrollableDiv = document.querySelectorAll("#fixed .scrollable-div")[0];
    scrollableDiv.style.width = "20000px";
    ParallaxModel.startSite();
    ParallaxModel.calulatePosition();

    function doneResizing() {
        ParallaxModel.recalculateWidth();
        var layers = document.querySelectorAll(".image-container__layer");
        var width, left;
        for (var i = 1; i < layers.length; i++) {
            layer = layers[i];
            width = layer.children[0].clientWidth - window.innerWidth;
            if (-(layer.offsetLeft) > width) {
                layer.style.left = -width + "px";
            }
        }
    }
}
window.onorientationchange = function() {
    window.location.reload();
};
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};
