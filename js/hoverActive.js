//Вешаем active при hover
let menuParents = document.querySelectorAll('li');

    for (let index = 0; index < menuParents.length; index++){
        const menuParent = menuParents[index];
        menuParent.addEventListener("mouseenter", function (e){
            menuParent.classList.add('active');
        });
         menuParent.addEventListener("mouseleave", function (e){
            menuParent.classList.remove('active');
        });
    }