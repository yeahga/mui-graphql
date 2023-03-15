import { Avatar, Button, TextField, Typography, Box } from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { PositionSelect } from './PositionSelect';
import { RelationSelect } from './RelationSelect';
import { DEFAULT_VALUES, FieldEnum, RULES } from '../constants';
import { locale } from '../i18n';
import { Inputs } from '../types';

export function Form() {
  const { control, handleSubmit, reset } = useForm<Inputs>({ defaultValues: DEFAULT_VALUES });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {locale.greeting}
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Controller
          name={FieldEnum.position}
          control={control}
          rules={RULES[FieldEnum.position]}
          render={({ field, fieldState }) => <PositionSelect {...field} validationError={fieldState.error?.message} />}
        />

        <Controller
          name={FieldEnum.relation}
          control={control}
          rules={RULES[FieldEnum.relation]}
          render={({ field, fieldState }) => <RelationSelect {...field} validationError={fieldState.error?.message} />}
        />

        <Controller
          name={FieldEnum.name}
          control={control}
          rules={RULES[FieldEnum.name]}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label={locale.labels.name}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name={FieldEnum.bio}
          control={control}
          rules={RULES[FieldEnum.bio]}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label={locale.labels.bio}
              multiline
              minRows={4}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {locale.submit}
        </Button>
      </Box>
    </Box>
  );
}
