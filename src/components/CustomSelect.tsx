import { ForwardedRef, forwardRef, Key, SyntheticEvent, useEffect, useMemo, useState, MouseEvent } from 'react';
import { Autocomplete, TextField, ListItemText, createFilterOptions, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Option } from '../types';
import { locale } from '../i18n';

const getOptionLabel = (option: Option | null): string => option?.name ?? '';
const getOptionKey = (option: Option): Key => option.id;
const isOptionEqualToValue = (option: Option, value: Option): boolean => option.id === value.id;
const filter = createFilterOptions<Option>();

type Props = {
  options: Option[];
  multiple?: boolean;
  label: string;
  loading?: boolean;
  error?: string;
  name?: string;
  onChange: (value: Option[] | Option | null) => void;
  value: Option[] | Option | null;
};

export const CustomSelect = forwardRef(function CustomSelect(
  { onChange, options, multiple, label, loading, error, name, value }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [optionList, setOptionList] = useState<Option[]>(options);
  const optionIdMap = useMemo(
    () =>
      optionList.reduce((acc, options) => {
        acc[options.id] = true;
        return acc;
      }, {} as Record<PropertyKey, true>),
    [optionList],
  );

  useEffect(() => {
    setOptionList(options);
  }, [options]);

  const handleChange = (event: SyntheticEvent, value: Option | Option[] | null) => {
    if (value !== null) {
      const valueList = Array.isArray(value) ? value : [value];
      const newValue = valueList.find((option) => !optionIdMap[option.id]);

      if (newValue) {
        setOptionList((prevOptions) => [...prevOptions, { ...newValue, custom: true }]);
      }
    }

    onChange(value);
  };

  const handleDeleteOption = (event: MouseEvent<HTMLButtonElement>, { id }: Option) => {
    event.stopPropagation();

    if (Array.isArray(value)) {
      onChange(value.filter((v) => v.id !== id));
    } else if (value?.id === id) {
      onChange(null);
    }

    setOptionList((prevOptions) => prevOptions.filter((option) => option.id !== id));
  };

  return (
    <Autocomplete
      options={optionList}
      value={value}
      multiple={multiple}
      loading={loading}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      clearText={locale.clearText}
      closeText={locale.closeText}
      loadingText={locale.loadingText}
      noOptionsText={locale.noOptionsText}
      openText={locale.openText}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          ref={ref}
          error={!!error}
          helperText={error}
          label={label}
          fullWidth
          margin="normal"
        />
      )}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);

        if (inputValue !== '' && !isExisting) {
          filtered.push({ name: inputValue, id: Date.now() });
        }

        return filtered;
      }}
      renderOption={(props, option) => (
        <ListItem
          {...props}
          key={getOptionKey(option)}
          secondaryAction={
            option.custom && (
              <IconButton
                edge="end"
                aria-label={locale.remove}
                title={locale.remove}
                onClick={(event) => {
                  handleDeleteOption(event, option);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )
          }
        >
          <ListItemText>
            {!optionIdMap[option.id] ? locale.addNewItem(getOptionLabel(option)) : getOptionLabel(option)}
          </ListItemText>
        </ListItem>
      )}
    />
  );
});
