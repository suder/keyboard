"use strict";

/* *
 * Клавиатура
 * - Подсвечивает частоту использования букв
 * - Показывает какую клавишу нажали
 * - Форматирует текст в читаемый вид
 *
 */

let stringTask = (function() {

    /* *
     * Объект с кодами кнопок.
     * Требуется для подсвечивания частоты использования букв
     *
     */
    let key = {
        219: 0.92,
        221: 0.04,
        186: 0.78,
        222: 0.17,
        188: 1.51,
        190: 1.03,
        65: 0.40,
        66: 7.45,
        67: 5.45,
        68: 4.19,
        69: 2.90,
        70: 8.66,
        71: 3.35,
        72: 5.53,
        73: 0.77,
        74: 9.28,
        75: 4.32,
        76: 2.56,
        77: 1.90,
        78: 6.30,
        79: 0.49,
        80: 1.81,
        81: 1.31,
        82: 3.47,
        83: 2.11,
        84: 8.10,
        85: 1.41,
        86: 3.29,
        87: 0.29,
        88: 1.27,
        89: 6.35,
        90: 2.22
    };

    /* *
     * Список символов и правила их обработки.
     */

    // После этих делаем пробел и следующая буква заглавная
    let addSpaceUpper = {
        sym: ["!", "?", "."]
    };

    // Тут просто пробел после символа
    let addSpace = {
        sym: [",", ":"]
    };

    // Пробел до и после символов
    let doubleSpace = {
        sym: ["-", "+", "="]
    };

    // Слова, которые надо заменить
    let exWords = {
        "итмо": "ИТМО",
        "россия": "Россия",
        "валера": "Валера"
    };
    return {

        /* *
         * stringFreq() - Метод, который выделяет клавишу в зависимости от частоты её использования.
         * В цикле перебираем объект с кодами клавиш и выставлемя значение {opacity} в зависимости от частоты.
         * Пример: 5.45% -> (умножаем на 10 (54.5) и приводим к целому) -> 54 ->
         * -> Добавляем 0 (opacity принимает от 0 до 1) -> 0.54. Итого: {oacity: 0.54;}
         *
         */
        stringFreq: function() {
            for (let c in key) {
                let freqKey = document.getElementById("k" + c);
                freqKey.style.background = "blue";
                let opacity = parseInt(key[c] * 10);
                if (opacity == 0) {
                    opacity = "1";
                }
                freqKey.style.opacity = '0.' + opacity;
            }
        },

        /* *
         * keyDown() - Метод, который вызывается при нажатии клавиши (onkeydown).
         * Принимает код клавиши (e), затем находит по этому коду нужный id и делает фон черного цвета.
         * setTimeout() вызывает метод stringFreq() для новой отрисовки клавиатуры.
         *
         */
        keyDown: function(e) {
            let active = document.getElementById("k" + e);
            if (active) {
                active.style.opacity = '1';
                active.style.background = "#000";
                setTimeout(function() {
                    active.style.background = "none";
                    stringTask.stringFreq();
                }, 500);
            }
        },

        /* *
         * strRules() - Обработка строки из textarea.
         * На вход получаем строку, возвращаем строку отформатированную по всем правилам.
         *
         */
        strRules: function(str) {
            let newStr = '';
            let sym = '';
            let strLen = str.length;
            str = str.toLowerCase(); // всю строку приводим к нижнему регистру
            let spaceAndUpper = addSpaceUpper.sym;
            let spaceAnd = addSpace.sym;
            let spaceDouble = doubleSpace.sym;

            /* *
             * Заменяем в строке слова, которые указаны в {exWords}
             * (если такие есть)
             */
            for (let x in exWords) {
                str = str.replace(x, exWords[x]);
            }

            /* *
             * Посимвольно проходим по всей строке
             *
             */
            for (let i = 0; i < strLen; i++) {
                let symExist = spaceAndUpper.indexOf(str[i]);
                let symSpace = spaceAnd.indexOf(str[i]);
                let double = spaceDouble.indexOf(str[i]);

                /* *
                 * Если найдены символы, после которых надо ставить пробел,
                 * а следующую букву делать заглавной
                 *
                 */
                if (symExist != '-1') {
                    newStr += str[i] + ' ';
                    i++;

                    // если ещё не конец строки
                    if (i < strLen) {
                        newStr += str[i].toUpperCase();
                    }
                }

                /* *
                 * Если после символа просто нужен пробел
                 *
                 */
                else if (symSpace != '-1') {
                    newStr += str[i] + ' ';
                }

                /* *
                 * Если требуется поставить пробел до и после символа
                 *
                 */
                else if (double != '-1') {
                    newStr += ' ' + str[i] + ' ';
                }

                /* *
                 * Если символ не попал не под какие условия
                 *
                 */
                else {
                    newStr += str[i];
                }
            }
            newStr = newStr[0].toUpperCase() + newStr.substr(1); // Первую букву делаем заглавной
            return newStr;
        }
    }
}());

/* *
 * Отливливаем события нажатия на клавишу (onkeydown).
 * Передаём в keyDown() код клавиши
 *
 */
document.onkeydown = function(e) {
        let char = e.keyCode;
        stringTask.keyDown(char);
    }

/* *
 * Отрисовываем клавиатуру по частоте использования букв
 *
 */
stringTask.stringFreq();

/* * 
 * Форматирование строки введённой в textarea
 * Событие сробатывает при нажатии на кнопку форматирования
 *
 */
btn.addEventListener("click", function() {
    let text = document.getElementById("text").value;
    let result = stringTask.strRules(text);
    document.getElementById("text").innerHTML = result;
    document.getElementById("text").value = result;
});