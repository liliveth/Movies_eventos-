

window.onload = function(){
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    let inputs = document.querySelectorAll('.input')
    let form = document.querySelector('form');
    let listErrores = document.querySelector(".errores");
    const errores = {}

    const isEmpty = function(elemento){
        return elemento.value == "";
    }

    const between = function (value, min, max){
        return value >= min && value <= max;
    }

    const addError = function (elemento, mensaje){
        elemento.classList.add("is-invalid");
        errores[elemento.name] = mensaje;
        const child = document.querySelector(`#Error${elemento.name}`)
        const tag = document.createElement("li");
        tag.id = `Error${elemento.name}`;
        tag.innerText = mensaje;
        tag.classList.add('alert-warning')
        child ? listErrores.replaceChild(tag,child) : listErrores.appendChild(tag)
    }

    const removeError = function (elemento){
        elemento.classList.remove("is-invalid");
        elemento.classList.add("is-valid");
        delete errores[elemento.name];
        const childList = document.querySelector(`#Error${elemento.name}`);
        const childMessage = document.querySelector(`#Message${elemento.name}`);
        const contenedor = document.querySelector(`.${elemento.name}`)
        childList ? listErrores.removeChild(childList) : null;
        childMessage ? contenedor.removeChild(childMessage) : null;

    }

    const addMsj = function (elemento, mensaje) {
        const message = document.createElement("p");
        message.innerText = mensaje
        message.id = `Message${elemento.name}`
        message.classList.add("is-invalid");
        const contenedor = document.querySelector(`.${elemento.name}`)
        const oldMessage = document.querySelector(`#Message${elemento.name}`)
        oldMessage ? contenedor.replaceChild(message, oldMessage) : contenedor.appendChild(message)
    }

    const validate = function(elemento, e){
        if(isEmpty(elemento)){
            let mensaje = `El input ${elemento.name} no puede estar vacío`
            e.type == "blur" ? addMsj(elemento, mensaje) : addError(elemento, mensaje);          
            return;
        }
        if(elemento.name == "awards" || elemento.name == "rating"){
            if(!between(elemento.value, 0, 10)){
                let mensaje = `El campo ${elemento.name} debe contener un valor entre 0 y 10`
                e.type == "blur" ? addMsj(elemento, mensaje) : addError(elemento, mensaje);          
                return;
            } 
        } else if(elemento.name == "length"){
            if(!between(elemento.value, 60, 360)){
                let mensaje = `El campo ${elemento.name} debe contener un valor entre 60 y 360`
                e.type == "blur" ? addMsj(elemento, mensaje) : addError(elemento, mensaje);          
                return;
            }
        }
        removeError(elemento)
        return
    }

    const inputTitle = document.querySelector("#title")
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//   

    inputTitle.focus()
    inputs.forEach(node => {
        node.addEventListener("blur", function(e){
            validate(this,e)
        })
    })

    form.addEventListener("submit", function(e){
        inputs.forEach(elemento => {
            validate(elemento, e)
        })

        const allP = document.querySelectorAll('p')
        allP.forEach(elemento =>{
            elemento.remove()
        })

        if(Object.keys(errores).length > 0){
            e.preventDefault();
        }
        
        Swal.fire({
            title: "La película se guardó satisfactoriamente.",
            showConfirmButton: true,
            timer: 3000,
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff ", 
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io//images/nyan-cat.gif")
              left top 
            `
          });
          
        
    })
}