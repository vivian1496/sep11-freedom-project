import kaboom from "kaboom"



const k = kaboom()

k.loadSprite("bean", "sprites/bean.png");

k.add([
	k.pos(120, 80);
	k.sprite("bean");
])

k.onClick(() => k.addKaboom(k.mousePos()))

setGravity(2400)

kaboom({
    width: 320;
    height: 240;
    font: "sans-serif";
    canvas: document.querySelector("#mycanvas");
    background: [ 0, 0, 255, ];

})