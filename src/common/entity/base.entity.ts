import { instanceToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { flatten } from '~utils/validation';
import { ValidationError } from '~common/error/validation.error';

export function trackChanges<T>(e: BaseEntity<any>): T {
  return new Proxy(e, {
    set(target: any, prop: any, value: any) {
      target[prop] = value;
      target.__changedProps.push(prop);
      return true;
    },
  }) as T;
}

export abstract class BaseEntity<T> {
  private __changedProps: (keyof T)[] = [];

  toPersist(operation: 'create'): T;
  toPersist(operation: 'update'): Partial<Omit<T, 'id'>>;
  toPersist(operation: 'create' | 'update'): T | Partial<Omit<T, 'id'>> {
    const plain = instanceToPlain(this, { excludeExtraneousValues: true });

    if (operation === 'create') {
      return plain as T;
    } else {
      const persist: Partial<T> = {};

      for (const prop of this.__changedProps) {
        if (prop === 'id') continue;
        persist[prop] = plain[prop as string];
      }
      return persist;
    }
  }

  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new ValidationError(flatten(errors));
    }
    return this;
  }
}
