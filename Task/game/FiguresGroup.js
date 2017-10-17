var FiguresGroup = function FiguresGroup(figures_limit_length) {
    this._figures_limit_length = figures_limit_length;
    this._figures = [];
    this._figuresLenght = 0;
};

FiguresGroup.prototype.generateRandomFigure = function () {
    return FiguresGroup.allPosibleFigures[getRandom(1, 4)]();
}

FiguresGroup.allPosibleFigures = {
    1: function () {
       return new Ellipse(getRandom(10, 100), getRandom(20, 150), getRandom(1, 50));
    },
    2: function () {
        return new Circle(getRandom(10, 50), getRandom(1, 50));
    },
    3: function () {
        return new Rectangle(getRandom(10, 100), getRandom(20, 150), getRandom(1, 50));
    },
    4: function () {
        return new Square(getRandom(10, 100), getRandom(1, 50));
    }
}

/**
 * @description Добавляет фигуру в коллекцию фигур на поле.
 * @param figure
 */
FiguresGroup.prototype.getNumberOfFigures = function () {
    return this._figuresLenght;
}

FiguresGroup.prototype.addFigure = function (figure) {
    this._figures.push(figure);
    this._figuresLenght++;
    figure.insertElement(figure.element);
};

/**
 * @description Возвращает фигуры, который в данный момент на поле.
 * @returns {Figure[]} figures
 */
FiguresGroup.prototype.getFigures = function () {
    return this._figures;
};

/**
 * @description Удаляет все фигуры с поля
 */
FiguresGroup.prototype.clear = function () {
    this._figures = [];
};

/**
 * @description Удаляет заданную фигуру с поля по ее ID.
 * @param {Figure} figure
 */
FiguresGroup.prototype.remove = function (figureID) {
    this._figures.remove(figureID);
};