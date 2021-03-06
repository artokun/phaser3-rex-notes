import IsPlainObject from '../../utils/object/IsPlainObject.js';
import GetValue from '../../utils/object/GetValue.js';
import DestroyCallbackMethods from './DestroyCallbackMethods.js';
import ContainMethods from './ContainMethods.js';
import ArrayMethods from './ArrayMethods.js';
import SetMethods from './SetMethods.js';
import Clone from '../../utils/object/Clone.js';
import ArrayCopy from '../../utils/array/Copy.js';

class UniqueItemList {
    constructor(items, config) {
        if (IsPlainObject(items)) {
            config = items;
            items = GetValue(config, 'items', undefined);
        }

        this.items = [];
        this.enableDestroyCallback(GetValue(config, 'enableDestroyCallback', true));
        if (items) {
            this.addMultiple(items);
        }
    }

    destroy(destroyItems) {
        this.clear(destroyItems);
        this.items = undefined;
    }

    getItems() {
        return this.items;
    }

    cloneItems(out) {
        return Clone(this.items, out);
    }

    isList(item) {
        return (item instanceof UniqueItemList);
    }

    newList(items) {
        var config = {
            enableDestroyCallback: this._enableDestroyCallback
        }
        return new UniqueItemList(items, config);
    }

    get length() {
        return this.items.length;
    }

    call(fnName) {
        if (this.items.length === 0) {
            return this;
        }

        ArrayCopy(ARGS, arguments, 1);
        var item;
        for (var i = 0, cnt = this.items.length; i < cnt; i++) {
            item = this.items[i];
            item[fnName].apply(item, ARGS);
        }
        return this;
    }
}

var ARGS = []; // reuse this array

Object.assign(
    UniqueItemList.prototype,
    DestroyCallbackMethods,
    ContainMethods,
    ArrayMethods,
    SetMethods
)

export default UniqueItemList;