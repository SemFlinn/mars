const options = {
  // root: document.querySelector( '#viewport' ), // я закомментил строку, чтобы использовать значение по умолчанию
  rootMargin: '0px',
  threshold: [ 1 ]
};
 
/*const observer = new IntersectionObserver( trueCallback, options );*/
 
const target = document.querySelector( '.section6' );
/*observer.observe( target ); // запускаем "слежку" за элементом(ами) в константе target*/
 
// callback-функция (возвратная функция)
const trueCallback = function(entries, observer) {
  entries.forEach((entry) => {
    // делаем что-либо для каждого переданного элемента (в нашем случае он один)
    console.log( 'сработало' );
    // например можно добавить какой-либо CSS-класс элементу
    entry.target.classList.toggle( '_active' );
  });
}

const observer = new IntersectionObserver( trueCallback, options );
observer.observe( target ); // запускаем "слежку" за элементом(ами) в константе target
