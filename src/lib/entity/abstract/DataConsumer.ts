export abstract class ConsumerEntity {

    protected abstract consumeArray(data: object[]);

    protected mapToClass<T extends ConsumerEntity>(data: object[], t: new (data: object) => T): T[] {
        return data.map((element) => {
            const c = new t(element);
            return c;
        });
    }

    protected consumeObject(data: object) {
        for (const key in Object.getOwnPropertyNames(this)) {
            if (key in data) {
                if (!(data[key] instanceof Array)) {
                    this[key] = data[key];
                } else {
                    this.consumeArray(data[key]);
                }
            }
        }
    }
}
