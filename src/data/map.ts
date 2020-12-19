/*
 * @Author: CC-TSR
 * @Date: 2020-12-18 08:58:26
 * @LastEditTime: 2020-12-19 11:44:55
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\data\map.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
import MapView from 'esri/views/MapView';
import SceneView from 'esri/views/SceneView';
import WebMap from 'esri/WebMap';
import WebScene from 'esri/WebScene';
import Expand from 'esri/widgets/Expand';
import Legend from 'esri/widgets/Legend';
import LayerList from 'esri/widgets/LayerList'
import Slide from "esri/webscene/Slide"

import { webMapId, webSceneId } from '../config';



export const webMap = new WebMap({
    portalItem: {
        id: webMapId
    },
});

export const webScene = new WebScene({
    portalItem: {
        id: webSceneId
    }
});


export const view = new MapView({
    map: webMap
});

export const scene = new SceneView({
    map: webScene
})
var layerList = new LayerList({
    view: scene
})
var layerList2D = new LayerList({
    view
})
scene.ui.add(layerList, 'top-right');
view.ui.add(layerList2D, 'top-right');
scene.popup.autoOpenEnabled = true;
scene.popup.dockOptions = {
    // Dock the popup when the size of the view is less than or equal to 600x1000 pixels
    breakpoint: {
        width: 300,
        height: 300
    },
    position: "bottom-right"
};
scene.popup.dockEnabled = true;

export const slidesDiv = document.createElement("div");
slidesDiv.classList.add("esri-widgets");
slidesDiv.style.display = "flex";
slidesDiv.style.flexDirection = "row";
slidesDiv.style.width = "100%";
slidesDiv.style.bottom = "20px";
slidesDiv.style.justifyContent = "center";
slidesDiv.id = "slidesDiv";

/*********************************************************************
 * Function to create the UI for a slide by creating DOM nodes and
 * adding them to the slidesDiv container.
 *********************************************************************/
function createSlideUI(slide: any, placement: any) {
    /*********************************************************************
     * Create a new <div> element which contains all the slide information.
     * Store a reference to the created DOM node so we can use it to place
     * other DOM nodes and connect events.
     *********************************************************************/
    var slideElement = document.createElement("div");
    // Assign the ID of the slide to the <span> element
    slideElement.id = slide.id;
    slideElement.classList.add("slide");

    /*********************************************************************
     * Place the newly created DOM node cat the beginning of the slidesDiv
     *********************************************************************/
    if (placement === "first") {
        slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
    } else {
        slidesDiv.appendChild(slideElement);
    }

    /*********************************************************************
     * Create a <div> element to contain the slide title text
     *********************************************************************/
    var title = document.createElement("div");
    title.innerText = slide.title.text;
    // Place the title of the slide in the <div> element
    slideElement.appendChild(title);

    /*********************************************************************
     * Create a new <img> element and place it inside the newly created slide
     * element. This will reference the thumbnail from the slide.
     *********************************************************************/
    var img = new Image();
    // Set the src URL of the image to the thumbnail URL of the slide
    img.src = slide.thumbnail.url;
    // Set the title property of the image to the title of the slide
    img.title = slide.title.text;
    // Place the image inside the new <div> element
    slideElement.appendChild(img);

    /*********************************************************************
     * Set up a click event handler on the newly created slide. When clicked,
     * the code defined below will execute.
     *********************************************************************/
    slideElement.addEventListener("click", function () {
        /*******************************************************************
         * Remove the "active" class from all elements with the .slide class
         *******************************************************************/
        var slides = document.querySelectorAll(".slide");
        Array.from(slides).forEach(function (node) {
            node.classList.remove("active");
        });

        /*******************************************************************
         * Add the "active" class on the current element being selected
         *******************************************************************/
        slideElement.classList.add("active");

        /******************************************************************
         * Applies a slide's settings to the SceneView.
         *
         * Each slide has a viewpoint and visibleLayers property that define
         * the point of view or camera for the slide and the layers that should
         * be visible to the user when the slide is selected. This method
         * allows the user to animate to the given slide's viewpoint and turn
         * on its visible layers and basemap layers in the view.
         ******************************************************************/
        slide.applyTo(scene);
    });
}

// add a legend widget instance to the view
// and set the style to 'card'. This is a
// responsive style, which is good for mobile devices
export const legend = new Expand({
    content: new Legend({
        view,
        style: 'card'
    }),
    view,
    expanded: true
});


// var _container: HTMLDivElement = null
/**
 * 将容器元素分配给视图
 * @param container
 */
export const initialize = (container: HTMLDivElement, container3d: HTMLDivElement, widget: HTMLDivElement) => {
    container3d.parentElement.appendChild(slidesDiv)
    scene.ui.add([widget, slidesDiv]);
    view.container = container;
    scene.container = container3d
    
    view.when()
        .then(_ => {
            view.ui.remove("attribution");
            console.log('Map and View are ready');
        })
        .catch(error => {
            console.warn('An error in creating the map occured:', error);
        });

    scene.when()
        .then(_ => {
            scene.ui.remove("attribution");
            document.getElementById("slidesDiv").style.visibility = "visible";

            //  网络场景的 slides 存储在 webScene 的 presentation 属性里
            var slides = webScene.presentation.slides;


            // 循环渲染每张幻灯片
            slides.forEach(createSlideUI);

  
            // 按钮绑定创建幻灯片事件
            document
                .getElementById("createSlideButton")
                .addEventListener("click", function () {
                    /*******************************************************************
                     * Use the Slide.createFrom static method to create a new slide which
                     * contains a snapshot (visible layers, basemap, camera) of the
                     * current view. This method returns a Promise which resolves with a
                     * new Slide instance once the slide as been successfully created.
                     *******************************************************************/
                    Slide.createFrom(scene).then(function (slide) {
                        /*****************************************************************
                         * Set the slide title
                         *****************************************************************/
                        slide.title.text = document.getElementById(
                            "createSlideTitleInput"
                        ).value;

                        /*****************************************************************
                         * Add the slide to the slides collection of the scene presentation
                         * such that if the scene were to published back to the portal, the
                         * newly created slide would be correctly persisted as part of the
                         * WebScene
                         *****************************************************************/
                        webScene.presentation.slides.add(slide);

                        /*****************************************************************
                         * Create UI for the slide and present it to the user
                         *****************************************************************/
                        createSlideUI(slide, "first");
                    });
                });
        })
        .catch(error => {
            console.warn('An error in creating the map occured:', error);
        });
};



// 已废弃的2D转3D视图代码
// export const changeTo2D = () => {
//     // view.container = view.container??scene.container;

//     console.log(view.container)

//     view.container = _container
//     scene.container = null
// }

// export const changeTo3D = () => {
//     // scene.container = scene.container??view.container;
//     if(scene.container) return
//     scene.destroy()
//     scene = new SceneView({
//         map: webScene
//     })
//     scene.container = _container
//     view.container = null

// }
