import { Filter } from '@mikro-orm/core';

export interface ISoftDeleteOptions {
  enabled?: boolean;
  defaultIsDeleted?: boolean;
  field?: string;
}

const defaultOptions = {
  isEnabled: true,
  isDefaultIsDeleted: false,
  field: 'deletedAt',
};

export const SoftDelete = (
  options: ISoftDeleteOptions = {},
): ClassDecorator => {
  const { isEnabled, isDefaultIsDeleted, field } = {
    ...defaultOptions,
    ...options,
  };

  return Filter({
    name: 'softDelete',
    cond: ({ isDeleted = isDefaultIsDeleted }: { isDeleted?: boolean } = {}) =>
      isDeleted ? { [field]: { $ne: null } } : { [field]: null },
    args: false,
    default: isEnabled,
  });
};
