(function () {
	let original_positions = [];
	let da_elements = document.querySelectorAll('[data-da]');
	let da_elements_array = [];
	let da_match_media = [];
    //Заполняем масивы
    if (da_elements.length > 0) {
    	let number = 0;
    	for (let index = 0; index < da_elements.length; index++) {
    		const da_element = da_elements[index];
    		const da_move = da_element.getAttribute('data-da');
    		const da_array = da_move.split(',');
    		if (da_array.length == 3) {
    			da_element.setAttribute('data-da-index', number);
    			 // Заполняем масив первоначальных позицый
    			 original_positions[number] = {
    			 	"parent": da_element.parentNode,
    			 	"index": index_in_parent(da_element)
    			 };
    			 // Заполняем масив элементов
    			 da_elements_array[number] = {
    			 	"element": da_element,
    			 	"destination": document.querySelector('.' + da_array[0].trim()),
    			 	"place": da_array[1].trim(),
    			 	"breakpoint": da_array[2].trim()
    			 }
    			 number++;
    		}
    	}
    	dynamic_adapt_sort(da_elements_array);

    	// Создаём события в точке брекпоинта
    	for (let index = 0; index < da_elements_array.length; index++) {
    		const el = da_elements_array[index];
    		const da_breakpoint = el.breakpoint;
    	    const da_type = "max"; //Для Mobilfirst поменять на min

    	    da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
    	    da_match_media[index].addListener(dynamic_adapt);

    	}
    }
    //Основная функция
    function dynamic_adapt(e) {
    	for (let index = 0; index < da_elements_array.length; index++) {
    		const el = da_elements_array[index];
    		const da_element = el.element;
    		const da_destination = el.destination;
    		const da_place = el.place;
    		const da_breakpoint = el.breakpoint;
    		const da_classname = "_dynamic_adapt_" + da_breakpoint;

    		if (da_match_media[index].matches) {
    			//Перебрасываем элемерты
    			if (!da_element.classList.contains(da_classname)) {
    				let actual_index;
    				if (da_place == 'first') {
    					actual_index = index_of_elements(da_destination)[0];
    				} else if (da_place == 'last') {
    					actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
    				} else {
    					actual_index = index_of_elements(da_destination)[da_place];
    				}
    				da_destination.insertBefore(da_element, da_destination.children[actual_index]);
    				da_element.classList.add(da_classname);
    			}
    		} else {
                //Возвращаем на место
    			if (da_element.classList.contains(da_classname)) {
    				dynamic_adapt_back(da_element);
    				da_element.classList.remove(da_classname);
    			}
    		}
    	}
    	custom_adapt();
    }

    //Вызов основной функции
    dynamic_adapt();

    //Функция возврата на место
    function dynamic_adapt_back(el) {
    	const da_index = el.getAttribute('data-da-index');
    	const original_place = original_positions[da_index];
    	const parent_place = original_place['parent'];
    	const index_place = original_place['index'];
    	const actual_index = index_of_elements(parent_place, true)[index_place];
    	parent_place.insertBefore(el, parent_place.children[actual_index]);
    }
    //функция получения индекса внутри родителя
    function index_in_parent(el) {
    	var children = Array.prototype.slice.call(el.parentNode.children);
    	return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя
    function index_of_elements(parent, back) {
    	const children = parent.children;
    	const children_array = [];
    	for (let i = 0; i < children.length; i++) {
    		const children_element = children[i];
    		if (back) {
    			children_array.push(i);
    		} else {
    			//Исключая перенесённый элемент
    			if (children_element.getAttribute('data-da') == null) {
    				children_array.push(i);
    			}
    		}
    	}
    	return children_array;
    }
    //Сортировка обьекта
    function dynamic_adapt_sort(arr) {
    	arr.sort(function (a, b) {
    	    if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }//Для Mobilfirst поменять
    	});
    	arr.sort(function (a, b) {
    	    if (a.place > b.place) { return 1 } else { return -1 }//Для Mobilfirst поменять
    	}); 
    }
    //Дополнительные сценарии адаптации
    function custom_adapt() {
    	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    //Обьявляем переменные
	//const parent_original = document.querySelector('.content__blocks_city');
	//const parent = document.querySelector('.content__column_river');
	//const item = document.querySelector('.content__block_item');
}());