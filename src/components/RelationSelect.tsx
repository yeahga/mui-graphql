import { useRelationsQuery } from '../generated/generated';
import { CustomSelect } from './CustomSelect';
import { ForwardedRef, forwardRef } from 'react';
import { locale } from '../i18n';
import { Option } from '../types';

const DEFAULT_OPTIONS: Array<Option> = [];

type Props = {
  validationError?: string;
  name?: string;
  value: Option[] | Option | null;
  onChange: (value: Option[] | Option | null) => void;
};

export const RelationSelect = forwardRef(function RelationSelect(
  { validationError, name, value, onChange }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { loading, data, error } = useRelationsQuery();

  const options = data?.applicantIndividualCompanyRelations?.data ?? DEFAULT_OPTIONS;

  return (
    <CustomSelect
      ref={ref}
      multiple
      value={value}
      onChange={onChange}
      name={name}
      label={locale.labels.relation}
      loading={loading}
      options={options}
      error={error?.message ?? validationError}
    />
  );
});
