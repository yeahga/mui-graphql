import { usePositionsQuery } from '../generated/generated';
import { CustomSelect } from './CustomSelect';
import { ForwardedRef, forwardRef } from 'react';
import { locale } from '../i18n';
import { Option } from '../types';

const DEFAULT_OPTIONS: Array<{ name: string; id: string }> = [];

type Props = {
  validationError?: string;
  name?: string;
  value: Option[] | Option | null;
  onChange: (value: Option[] | Option | null) => void;
};

export const PositionSelect = forwardRef(function PositionSelect(
  { validationError, name, value, onChange }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { loading, data, error } = usePositionsQuery();

  const options = data?.applicantIndividualCompanyPositions?.data ?? DEFAULT_OPTIONS;

  return (
    <CustomSelect
      ref={ref}
      value={value}
      onChange={onChange}
      name={name}
      loading={loading}
      label={locale.labels.position}
      options={options}
      error={error?.message ?? validationError}
    />
  );
});
