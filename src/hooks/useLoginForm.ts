// useLoginForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
// import { LoginFormInput } from '../../../models/interfaces';

interface LoginFormInput {
  email: string;
  password: string;
}
export const useLoginForm = () => {
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email({ message: t('validation.invalid_email') }),
    password: z.string().min(1, { message: t('validation.password_required') }),
  });

  const formOptions = { resolver: zodResolver(schema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>(formOptions);

  return { register, handleSubmit, errors };
};
