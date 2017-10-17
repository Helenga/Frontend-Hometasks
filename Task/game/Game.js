/**
 * @description Создает экземпляр игры
 * @param max_figures - принимает макс. кол-во фигур, которые можно поставить на поле мышкой.
 * @constructor
 */
var Game = function Game(max_figures) {
    this.name = "Популяция фигур";
    this.figuresGroup = null;
    this.figuresCounterElement = null;
    this.interval = null;
    this.MAX_FIGURES_NUMBER = max_figures;
    this._inited = false;
};

Game.FIELD = null;

/**
 * @description Тут может быть любая логика инициализации игры
 */
Game.prototype.initialize = function () {

    this.figuresGroup = new FiguresGroup(this.MAX_FIGURES_NUMBER);

    this.figuresCounterElement = document.querySelector('.fields__elements-count');

    Game.FIELD = document.querySelector('.field');

    this._inited = true;
};

Game.prototype.newFigure = function () {
    that = this;
    return function () {
        var figure = that.figuresGroup.generateRandomFigure();
        that.figuresGroup.addFigure(figure);
        that.figuresCounterElement.innerHTML = that.figuresGroup.getNumberOfFigures();
    }
};

/**
 * @description Функция run запускает игру
 */
Game.prototype.run = function () {
    if (!this._inited) {
        this.initialize();
    }

    /* Скрываем кнопку Play */
    var backdrop = document.querySelector('.field__backdrop');
    if (backdrop) {
        backdrop.style.visibility = 'hidden';
    }

    /* var field = document.querySelector('.field');*/
    Game.FIELD.addEventListener('click', this.newFigure());

    /* Каждые 1000/40 миллисекунд (40 FPS) вызываем перерисовку фигур с изменившимися координатами */
    var _this = this;
    this.interval = setInterval(function () {
        _this.nextFrame();
    }, 1000/40);
};

/**
 * @description Для каждой фигуры вызывается функция go, которая самостоятельно меняет координаты своей фигуры.
 */
Game.prototype.nextFrame = function () {
    var figures = this.figuresGroup.getFigures();
    for (var figureIndex in figures) {
        figures[figureIndex].go();
    }
};
