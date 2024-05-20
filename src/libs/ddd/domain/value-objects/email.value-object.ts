import {DomainPrimitive, ValueObject} from "@libs/ddd/domain/base-classes/value-object.base";
import {ArgumentInvalidException} from "@exceptions";

export class EmailVO extends ValueObject<string> {
    constructor(value: string) {
        super({ value });
    }

    public get value(): string {
        return this.props.value;
    }

    public get domain(): string {
        return this.props.value.split('@')[1];
    }

    protected validate({ value }: DomainPrimitive<string>): void {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        if (!isValid) {
            throw new ArgumentInvalidException('Incorrect email');
        }
    }

}
