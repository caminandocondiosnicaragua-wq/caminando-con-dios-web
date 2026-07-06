/**********************************************
PANEL DE LECTURA BÍBLICA
**********************************************/

document.addEventListener("click",function(e){

    if(e.target.id==="btnLeerBiblia"){

        abrirPanelBiblia();

    }

    if(e.target.id==="btnCerrarPanel"){

        cerrarPanelBiblia();

    }

});

function abrirPanelBiblia(){

    const panel=document.getElementById("panelBiblia");

    if(panel){

        panel.classList.remove("oculto");

        panel.classList.add("visible");

    }

}

function cerrarPanelBiblia(){

    const panel=document.getElementById("panelBiblia");

    if(panel){

        panel.classList.remove("visible");

        panel.classList.add("oculto");

    }

}
