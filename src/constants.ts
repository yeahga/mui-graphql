import { locale } from './i18n';
import { Inputs, Option } from './types';

export enum FieldEnum {
  name = 'name',
  bio = 'bio',
  position = 'position',
  relation = 'relation',
}

export const RULES = {
  [FieldEnum.name]: {
    required: { value: true, message: locale.validation.nameRequired },
    minLength: { value: 3, message: locale.validation.nameMinLength },
    maxLength: { value: 20, message: locale.validation.nameMaxLength },
  },
  [FieldEnum.bio]: {
    required: { value: true, message: locale.validation.bioRequired },
    minLength: { value: 10, message: locale.validation.bioMinLength },
    maxLength: { value: 200, message: locale.validation.bioMaxLength },
  },
  [FieldEnum.position]: {
    required: { value: true, message: locale.validation.positionRequired },
  },
  [FieldEnum.relation]: {
    validate: (value: Option[]) => value.length > 0 || locale.validation.relationRequired,
  },
};

export const DEFAULT_VALUES: Inputs = {
  [FieldEnum.name]: '',
  [FieldEnum.bio]: '',
  [FieldEnum.position]: null,
  [FieldEnum.relation]: [],
};
