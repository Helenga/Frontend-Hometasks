/**
 * @description Конструктор класса Figure. Это базовый класс для всех фигур.
 * @param width
 * @param height
 * @param velocity - Скорость
 * @constructor
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Figure = function Figure(width, height, velocity) {
    width = width || 24;
    height = height || 24;
    velocity = velocity || 1;

    Figure.AUTO_INCREMENT++;

    this.id = Figure.AUTO_INCREMENT;
    this.name = 'Неопознаная фигура';
    this.width = width;
    this.height = height;
    this.velocity = velocity;

    this.init();
};

Figure.prototype.init = function () {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.classList.toggle('figure'+this.id);
    this.coords.x = getRandom(10, 1000);
    this.coords.y = getRandom(10, 500);
    this.element.style.top = this.coords.y;
    this.element.style.left = this.coords.x;
};

/* статическое поле */
Figure.AUTO_INCREMENT = 0;

Figure.prototype.element = null;

Figure.prototype.coords = { x: 0, y: 0 };

/**
 * @description Вставляет DOM элемент в поле.
 * @param element
 */
Figure.prototype.insertElement = function (element) {
    var field = document.querySelector('.field');
    field.appendChild(element);
};

/**
 * @description Функция, которая должна вызываться из класса Game всякий раз, когда нужно изменить координаты для фигуры.
 */
Figure.prototype.go = function () {
    if (!this.element) {
        throw new Error('The element not set');
    }
    /* Тут должна быть логика изменения координат для объекта */
    var field = document.querySelector('.field');
    this.coords.x += this.velocity;
    this.coords.y += this.velocity;
    if (this.coords.x < field.clientWidth - this.width) {
        this.element.style.left = this.coords.x + 'px';
    }
    else {
        this.coords.x -= field.clientWidth - this.width;
        this.element.style.right = this.coords.x + 'px';
    }
    if (this.coords.y < field.clientHeight - this.height) {
        this.element.style.top = this.coords.y + 'px';
    }
    else {
        this.coords.y -= field.clientHeight - this.height;
        this.element.style.bottom = this.coords.y + 'px';
    }
};

/**
 * @description Конструктор класса Ellipse. Класс наследуется от Figure и создает элемент "Эллипс".
 * @constructor
 */
var Ellipse = function Ellipse(width, height, velocity) {
    Figure.apply(this, arguments);
    this.name = 'Эллипс';
    this.element.classList.toggle('figure-ellipse');
};
Ellipse.prototype = Object.create(Figure.prototype);


/**
 * @description Конструктор класса Circle. Класс наследуется от Ellipse и создает элемент "Круг".
 * @constructor
 */
var Circle = function Circle(radius, velocity) {
    Ellipse.apply(this, arguments);
    this.name = 'Круг';
    this.width = this.height = 2*radius || 24;
    this.velocity = velocity || 1;
    this.element.classList.toggle('figure-circle');
};
Circle.prototype = Object.create(Ellipse.prototype);

/**
 * @description Конструктор класса Rectangle. Класс наследуется от Figure и создает элемент "Прямоугольник".
 * @constructor
 */
var Rectangle = function Rectangle(width, height, velocity) {
    Figure.apply(this, arguments);
    this.name = 'Прямоугольник';
    this.element.classList.toggle('figure-rectangle');
};
Rectangle.prototype = Object.create(Figure.prototype);

/**
 * @description Конструктор класса Square. Класс наследуется от Rectangle и создает элемент "Квадрат".
 * @constructor
 */
var Square = function Square(size, velocity) {
    Rectangle.apply(this, arguments);
    this.name = 'Квадрат';
    this.width = this.height = size || 24;
    this.velocity = velocity;
    this.element.classList.toggle('figure-square');
};
Square.prototype = Object.create(Rectangle.prototype);
