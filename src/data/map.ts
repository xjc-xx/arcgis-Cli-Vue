
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
    // 当视图的大小小于或等于600x1000像素时，停靠弹出窗口
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
 * 通过创建DOM节点和创建幻灯片的UI的功能
 * 并将它们添加到slidesDiv容器中
 *********************************************************************/
function createSlideUI(slide: any, placement: any) {
    /*********************************************************************
     * 创建一个包含所有幻灯片信息的新<div>元素。
     * 存储对创建的DOM节点的引用，以便我们可以使用它来放置
     * 其他DOM节点和连接事件。
     *********************************************************************/
    var slideElement = document.createElement("div");

    slideElement.id = slide.id;
    slideElement.classList.add("slide");

    if (placement === "first") {
        slidesDiv.insertBefore(slideElement, slidesDiv.firstChild);
    } else {
        slidesDiv.appendChild(slideElement);
    }

    var title = document.createElement("div");
    title.innerText = slide.title.text;

    slideElement.appendChild(title);

    var img = new Image();
    img.src = slide.thumbnail.url;
    img.title = slide.title.text;

    slideElement.appendChild(img);


    slideElement.addEventListener("click", function () {

        var slides = document.querySelectorAll(".slide");
        Array.from(slides).forEach(function (node) {
            node.classList.remove("active");
        });


        slideElement.classList.add("active");

        /******************************************************************
        * 将幻灯片的设置应用于SceneView。
            * 每张幻灯片都有一个viewpoint和visibleLayers属性，它们定义了
            * 幻灯片或应包含的图层的视角或摄影机
            * 在选择幻灯片时对用户可见。这个方法
            * 允许用户动画化给定幻灯片的视点并旋转
            * 在视图的可见图层和底图图层上。 
         ******************************************************************/
        slide.applyTo(scene);
    });
}



/**
 * 将容器元素分配给View和Scene
 * @param container
 */
export const initialize = (container: HTMLDivElement, container3d: HTMLDivElement, widget: HTMLDivElement) => {
    container3d.parentElement.appendChild(slidesDiv)
    scene.ui.add(slidesDiv);
    scene.ui.add(widget, "top-right");
    view.container = container;
    scene.container = container3d

    view.when()
        .then(_ => {
            view.ui.remove("attribution")
            console.log('Map and View are ready');
        })
        .catch(error => {
            console.warn('An error in creating the map occured:', error);
        });

    scene.when()
        .then(_ => {
            console.log('Scene and View are ready');
            scene.ui.remove("attribution")
            document.getElementById("slidesDiv").style.visibility = "visible";
            console.log(document.getElementById("createSlideButton"))

            var slides = webScene.presentation.slides;


            slides.forEach(createSlideUI);


            document
                .getElementById("createSlideButton")
                .addEventListener("click", function () {

                    Slide.createFrom(scene).then(function (slide) {

                        slide.title.text = document.getElementById(
                            "createSlideTitleInput"
                        ).value;

                        webScene.presentation.slides.add(slide);

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
