/*
Criteria
(3): cellTypeIsTextOrEnum + COLUMN_TYPE
(4): All above + round
(5): All above + inlineStyle
(6): All above +  distinct
 */

export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};


export function cellTypeIsTextOrEnum(cell) {
    const cellType = cell.getAttribute('cell-type');
    return cellType == COLUMN_TYPE.TEXT || cellType == COLUMN_TYPE.ENUM;
}

function getDefaultTypeWidth(type) {
    switch (type) {
        case COLUMN_TYPE.TIME:
        case COLUMN_TYPE.TIMESPAN:
            return 80;
        case COLUMN_TYPE.NUMBER:
        case COLUMN_TYPE.CURRENCY:
            return 90;
        case COLUMN_TYPE.DATE:
            return 130;
        case COLUMN_TYPE.CHECKBOX:
            return 80;
        case COLUMN_TYPE.STATUS:
            return 20;
        default:
            return 44;
    }
}

export function round(number, decimals) {
    if (!decimals)
        decimals = 2;

    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

export function inlineStyle(el) {
    if (!this.width || this.width === 'auto')
        this.width = getDefaultTypeWidth(this.type);

    let style;
    if (this.width == null) {
        style = {};
    } else if (this.scaled) {
        style = {minWidth: `${this.width}px`};
    } else {
        style = {
            minWidth: `${this.width}px`,
            maxWidth: `${this.width}px`
        };
    }

    if(el) {
        el.style.minWidth = style.minWidth;
        el.style.maxWidth = style.maxWidth;
    }

    return style;
}


export function distinct(array, selector) {
    var map = new Map(),
        result = [];

    try {
        for (let i = 0; i < array.length; i++) {
            if (selector) {
                let key = selector(array[i]);

                if (map.has(key))
                    continue;

                result.push(array[i]);
                map.set(key);
            } else if (result.indexOf(array[i]) === -1) {
                result.push(array[i]);
            }
        }

        return result;
    } catch (e) {
        throw new Error(e.message);
    }
}
